import React, { useState, useEffect } from 'react';
import { X, Star, Volume2, VolumeX, Lightbulb, Compass, FileText, Check, AlertCircle, Share2, LogIn } from 'lucide-react';
import { NauticalTerm, getCategoryStyle } from '../types/glossary';
import { User as FirebaseUser } from 'firebase/auth';
import { speakNauticalTerm, stopSpeaking } from '../utils/speech';
import { GlossaryText } from './GlossaryText';
import { DayShapesIllustration } from './DayShapesIllustration';
import { SignalFlagsIllustration } from './SignalFlagsIllustration';
import { BuoyIllustration } from './BuoyIllustration';
import { BoatPartIllustration } from './BoatPartIllustration';
import { SafetyEquipmentIllustration } from './SafetyEquipmentIllustration';
import { CategoryIcon } from './CategoryIcon';

interface TermDetailModalProps {
  term: NauticalTerm | null;
  allTerms: NauticalTerm[];
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (termId: string) => void;
  currentUser: FirebaseUser | null;
  savedNote: string;
  onSaveNote: (termId: string, noteText: string) => Promise<void>;
  onSelectTerm: (term: NauticalTerm) => void;
  onOpenAuth: () => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  allTerms,
  onClose,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  savedNote,
  onSaveNote,
  onSelectTerm,
  onOpenAuth,
}) => {
  const [noteInput, setNoteInput] = useState(savedNote || '');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setNoteInput(savedNote || '');
  }, [savedNote, term]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeaking();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      stopSpeaking();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!term) return null;

  const catStyle = getCategoryStyle(term.category);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakNauticalTerm(
      term.term,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleSaveNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    try {
      setIsSavingNote(true);
      await onSaveNote(term.id, noteInput);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2500);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carta de Marinheiro: ${term.term}`,
          text: `${term.term}: ${term.definition}`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      await navigator.clipboard?.writeText(`${term.term}: ${term.definition}`);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3a55]/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-none border border-primary bg-card shadow-[6px_6px_0_0_#0b3a55] text-foreground my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="relative bg-background px-6 pt-6 pb-5 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            
            {/* Metadata Header */}
            <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.1em] flex-wrap">
              <span
                className={
                  term.importance === 'essencial'
                    ? 'text-[#9a7413] font-semibold'
                    : term.importance === 'importante'
                    ? 'text-[#1e7d4f] font-semibold'
                    : 'text-muted-foreground'
                }
              >
                {term.importance === 'essencial' ? '★ Exame Obrigatório' : term.importance}
              </span>
              {copiedFeedback && (
                <span className="inline-flex items-center gap-1 bg-[#dcebe1] px-2 py-0.5 text-[10px] font-semibold text-[#1e7d4f] border border-[#1e7d4f]/30">
                  <Check className="w-3 h-3" /> Copiado
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="rounded-none p-2 text-muted-foreground hover:text-primary hover:bg-secondary transition cursor-pointer"
                title="Partilhar ou copiar termo"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleSpeak}
                className={`rounded-none p-2 transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary'
                }`}
                title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia do termo'}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onToggleBookmark(term.id)}
                className={`rounded-none p-2 transition cursor-pointer ${
                  isBookmarked
                    ? 'text-[#ca9e1c]'
                    : 'text-muted-foreground/50 hover:text-[#ca9e1c] hover:bg-secondary'
                }`}
                title={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Star className={`w-5 h-5 ${isBookmarked ? 'fill-[#ca9e1c]' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="rounded-none p-2 text-muted-foreground hover:text-primary hover:bg-secondary transition ml-1 cursor-pointer"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="mt-3 font-maritime text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            {term.term}
          </h2>

          {/* Category -> SubCategory breadcrumb */}
          <div className="mt-2.5 flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.08em] flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 font-semibold border"
              style={{
                backgroundColor: catStyle.soft,
                color: catStyle.solid,
                borderColor: `${catStyle.solid}33`,
              }}
            >
              <CategoryIcon category={term.category} className="w-3.5 h-3.5 shrink-0" />
              <span>{term.category}</span>
            </span>
            <span className="text-muted-foreground font-bold">→</span>
            <span className="rounded-none bg-secondary px-2.5 py-1 font-medium border border-border text-primary">
              {term.subCategory || term.subcategory || 'Geral'}
            </span>
          </div>

          {term.synonyms && term.synonyms.length > 0 && (
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground italic">
              Outras designações: {term.synonyms.join(' • ')}
            </p>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Official Definition */}
          <div>
            <h4 className="font-mono-naut text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              Definição Oficial no Manual do Marinheiro
            </h4>
            <div className="text-sm sm:text-base text-foreground leading-relaxed rounded-none bg-background p-4.5 border border-border">
              <GlossaryText
                text={term.definition}
                allTerms={allTerms}
                currentTermId={term.id}
                onSelectTerm={onSelectTerm}
              />
            </div>
          </div>

          {/* Day Shapes / Balões Dedicated Illustration */}
          <DayShapesIllustration
            termId={term.id}
            variant="modal"
            allTerms={allTerms}
            onSelectTerm={onSelectTerm}
          />

          {/* Signal Flags / Bandeiras CIS Dedicated Illustration */}
          <SignalFlagsIllustration
            termId={term.id}
            variant="modal"
            allTerms={allTerms}
            onSelectTerm={onSelectTerm}
          />

          {/* IALA Buoys / Bóias de Balizamento Dedicated Illustration */}
          <BuoyIllustration
            termId={term.id}
            variant="modal"
            allTerms={allTerms}
            onSelectTerm={onSelectTerm}
          />

          {/* Boat Part / Regiões do Navio Dedicated Illustration */}
          <BoatPartIllustration
            termId={term.id}
            variant="modal"
          />

          {/* Safety Equipment / Meios de Salvação Dedicated Illustration (pp. 2-3) */}
          <SafetyEquipmentIllustration
            termId={term.id}
            variant="modal"
          />

          {/* Practical Onboard Example */}
          {term.example && (
            <div>
              <h4 className="font-mono-naut text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#9a7413]" />
                Aplicação Prática a Bordo
              </h4>
              <div className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic bg-secondary/60 p-4 rounded-none border border-border">
                "{term.example}"
              </div>
            </div>
          )}

          {/* Exam Tip Alert */}
          {term.examTip && (
            <div className="rounded-none border border-[#9a7413]/40 bg-[#f0e8cf]/65 p-4 text-foreground">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-none bg-[#f0e8cf] border border-[#9a7413]/30 p-2 text-[#9a7413] shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono-naut text-[11px] uppercase tracking-[0.1em] font-semibold text-[#9a7413]">
                    Importante para o Exame
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-foreground leading-relaxed">
                    {term.examTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h4 className="font-mono-naut text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-primary" />
                Termos Relacionados
              </h4>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((relatedId) => {
                  const related = allTerms.find((t) => t.id === relatedId);
                  if (!related) return null;
                  return (
                    <button
                      key={related.id}
                      onClick={() => onSelectTerm(related)}
                      className="cursor-pointer rounded-none border border-border bg-secondary/60 px-3 py-1.5 font-mono-naut text-[11px] font-medium text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground transition"
                    >
                      {related.term} →
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personal Study Notes (Synced to Cloud Firestore) */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono-naut text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" />
                Minhas Notas de Estudo (Cloud Firestore)
              </h4>
              {noteSavedFeedback && (
                <span className="flex items-center gap-1 font-mono-naut text-[11px] font-semibold text-[#1e7d4f]">
                  <Check className="w-3.5 h-3.5" /> Nota guardada na nuvem!
                </span>
              )}
            </div>

            {currentUser ? (
              <form onSubmit={handleSaveNoteSubmit} className="space-y-2.5">
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Escreva as suas notas pessoais, mnemónicas ou resumos sobre este termo para rever antes do exame..."
                  maxLength={1500}
                  rows={3}
                  className="w-full rounded-none border border-border bg-card p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
                <div className="flex items-center justify-between font-mono-naut text-[11px] text-muted-foreground">
                  <span>{noteInput.length}/1500 carateres</span>
                  <button
                    type="submit"
                    disabled={isSavingNote}
                    className="flex items-center gap-1.5 rounded-none bg-primary px-4 py-2 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium text-primary-foreground hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingNote ? 'A guardar...' : 'Guardar Nota'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-none border border-border bg-background p-4 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Inicie sessão com o Google para guardar notas de estudo personalizadas associadas a este termo e sincronizá-las no Cloud Firestore.
                </p>
                <button
                  onClick={onOpenAuth}
                  className="mt-3 inline-flex items-center gap-2 rounded-none bg-primary px-4 py-2 font-mono-naut text-[11px] uppercase tracking-[0.1em] font-medium text-primary-foreground hover:bg-[#082b3f] transition cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#ca9e1c]" />
                  Iniciar Sessão
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
