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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl text-slate-100 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner with Nautical Gradient */}
        <div className="relative bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 px-6 pt-6 pb-5 border-b border-slate-800">
          <div className="flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                <Compass className="w-3.5 h-3.5" />
                {categoryMeta.name}
              </span>

              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${
                  term.importance === 'essencial'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : term.importance === 'importante'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {term.importance === 'essencial' ? '★ Exame Obrigatório' : term.importance}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="rounded-xl p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
                title="Partilhar ou copiar termo"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleSpeak}
                className={`rounded-xl p-2 transition ${
                  isSpeaking
                    ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
                title={isSpeaking ? 'Parar leitura' : 'Ouvir pronúncia e definição'}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onToggleBookmark(term.id)}
                className={`rounded-xl p-2 transition ${
                  isBookmarked
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                }`}
                title={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Star className={`w-5 h-5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition ml-1"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {term.term}
          </h2>

          {term.synonyms && term.synonyms.length > 0 && (
            <p className="mt-1 text-xs sm:text-sm text-cyan-400/90 font-medium">
              Outras designações / Abreviaturas: {term.synonyms.join(' • ')}
            </p>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Official Definition */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              Definição Oficial (Programa DGRM)
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed rounded-2xl bg-slate-800/40 p-4 border border-slate-800">
              {term.definition}
            </p>
          </div>

          {/* Practical Onboard Example */}
          {term.example && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Aplicação Prática a Bordo
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-800/30 p-3.5 rounded-xl border-l-2 border-cyan-500">
                "{term.example}"
              </p>
            </div>
          )}

          {/* Exam Tip Alert */}
          {term.examTip && (
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-amber-500/20 p-2 text-amber-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">
                    Dica Crucial para o Exame de Carta de Marinheiro
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    {term.examTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
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
                      className="rounded-xl border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500 hover:text-cyan-300 hover:bg-slate-800 transition"
                    >
                      {related.term} →
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personal Study Notes (Synced to Cloud Firestore) */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Minhas Notas de Estudo (Cloud Firestore)
              </h4>
              {noteSavedFeedback && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
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
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{noteInput.length}/1500 carateres</span>
                  <button
                    type="submit"
                    disabled={isSavingNote}
                    className="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition disabled:opacity-50"
                  >
                    {isSavingNote ? 'A guardar...' : 'Guardar Nota'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                <p className="text-xs sm:text-sm text-slate-300">
                  Inicie sessão com o Google para guardar notas de estudo personalizadas associadas a este termo e sincronizá-las no Cloud Firestore.
                </p>
                <button
                  onClick={onOpenAuth}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-cyan-500 hover:to-blue-500 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
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
