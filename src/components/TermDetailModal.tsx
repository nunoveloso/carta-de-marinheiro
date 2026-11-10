import React, { useState, useEffect } from 'react';
import { X, Star, Volume2, VolumeX, Lightbulb, Compass, FileText, Check, AlertCircle, Share2, LogIn } from 'lucide-react';
import { NauticalTerm } from '../types/glossary';
import { CATEGORIES } from '../data/initialTerms';
import { User as FirebaseUser } from 'firebase/auth';

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setNoteInput(savedNote || '');
  }, [savedNote, term]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!term) return null;

  const categoryMeta = CATEGORIES.find((c) => c.id === term.category) || CATEGORIES[0];

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${term.term}. ${term.definition}. ${term.examTip ? `Dica de exame: ${term.examTip}` : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
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
      navigator.clipboard.writeText(`${term.term}: ${term.definition}`);
      alert('Definição copiada para a área de transferência!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112338]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#ded5c2] bg-[#fdfbf7] shadow-2xl text-[#1e293b] my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="relative bg-[#f4efe4] px-6 pt-6 pb-5 border-b border-[#ded5c2]">
          <div className="flex items-center justify-between gap-3">
            
            {/* Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs text-[#64748b] font-medium">
              <span className="font-semibold text-[#112338]">{categoryMeta.name}</span>
              <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
              <span
                className={
                  term.importance === 'essencial'
                    ? 'text-[#92400e] font-bold'
                    : term.importance === 'importante'
                    ? 'text-[#0f766e] font-semibold'
                    : 'text-[#64748b]'
                }
              >
                {term.importance === 'essencial' ? '★ Exame Obrigatório' : term.importance}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="rounded-xl p-2 text-[#64748b] hover:text-[#112338] hover:bg-[#eae3d2] transition"
                title="Partilhar ou copiar termo"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleSpeak}
                className={`rounded-xl p-2 transition ${
                  isSpeaking
                    ? 'bg-[#112338] text-[#fbf8f2]'
                    : 'text-[#64748b] hover:text-[#112338] hover:bg-[#eae3d2]'
                }`}
                title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia e definição'}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onToggleBookmark(term.id)}
                className={`rounded-xl p-2 transition ${
                  isBookmarked
                    ? 'text-[#d97706]'
                    : 'text-[#94a3b8] hover:text-[#d97706] hover:bg-[#eae3d2]'
                }`}
                title={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Star className={`w-5 h-5 ${isBookmarked ? 'fill-[#d97706]' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-[#64748b] hover:text-[#112338] hover:bg-[#eae3d2] transition ml-1"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="mt-3 font-maritime text-3xl sm:text-4xl font-bold text-[#112338] tracking-tight">
            {term.term}
          </h2>

          {term.synonyms && term.synonyms.length > 0 && (
            <p className="mt-1 text-xs sm:text-sm text-[#475569] italic">
              Outras designações: {term.synonyms.join(' • ')}
            </p>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Official Definition */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#112338]" />
              Definição Oficial (Programa DGRM)
            </h4>
            <div className="text-sm sm:text-base text-[#1e293b] leading-relaxed rounded-2xl bg-white p-4.5 border border-[#e5decb] shadow-2xs">
              {term.definition}
            </div>
          </div>

          {/* Practical Onboard Example */}
          {term.example && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#a16207]" />
                Aplicação Prática a Bordo
              </h4>
              <div className="text-xs sm:text-sm text-[#334155] leading-relaxed italic bg-[#f7f4ea] p-4 rounded-xl border border-[#e8dfcf]">
                "{term.example}"
              </div>
            </div>
          )}

          {/* Exam Tip Alert */}
          {term.examTip && (
            <div className="rounded-2xl border border-[#fef08a] bg-[#fefce8] p-4 text-[#854d0e]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-[#fef08a] p-2 text-[#a16207] shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#92400e]">
                    Dica Crucial para o Exame de Carta de Marinheiro
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#854d0e] leading-relaxed">
                    {term.examTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2">
                Termos Náuticos Relacionados
              </h4>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((relatedId) => {
                  const related = allTerms.find((t) => t.id === relatedId);
                  if (!related) return null;
                  return (
                    <button
                      key={related.id}
                      onClick={() => onSelectTerm(related)}
                      className="rounded-xl border border-[#ded5c2] bg-white px-3 py-1.5 text-xs font-medium text-[#1e293b] hover:border-[#112338] hover:bg-[#f4efe4] transition shadow-2xs"
                    >
                      {related.term} →
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personal Study Notes (Synced to Cloud Firestore) */}
          <div className="pt-4 border-t border-[#ded5c2]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#112338]" />
                Minhas Notas de Estudo (Cloud Firestore)
              </h4>
              {noteSavedFeedback && (
                <span className="flex items-center gap-1 text-xs font-semibold text-[#15803d]">
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
                  className="w-full rounded-2xl border border-[#ded5c2] bg-white p-3.5 text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#112338] focus:outline-none focus:ring-1 focus:ring-[#112338] transition shadow-2xs"
                />
                <div className="flex items-center justify-between text-xs text-[#64748b]">
                  <span>{noteInput.length}/1500 carateres</span>
                  <button
                    type="submit"
                    disabled={isSavingNote}
                    className="flex items-center gap-1.5 rounded-xl bg-[#112338] px-4 py-2 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition disabled:opacity-50"
                  >
                    {isSavingNote ? 'A guardar...' : 'Guardar Nota'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-2xl border border-[#ded5c2] bg-[#f7f3e8] p-4 text-center">
                <p className="text-xs sm:text-sm text-[#475569]">
                  Inicie sessão com o Google para guardar notas de estudo personalizadas associadas a este termo e sincronizá-las no Cloud Firestore.
                </p>
                <button
                  onClick={onOpenAuth}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#112338] px-4 py-2 text-xs font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#d4af37]" />
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
