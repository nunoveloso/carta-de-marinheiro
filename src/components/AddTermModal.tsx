import React, { useState } from 'react';
import { X, Plus, AlertCircle, Ship } from 'lucide-react';
import { TermCategory, TermImportance, NauticalTerm } from '../types/glossary';
import { CATEGORIES } from '../data/initialTerms';
import { User as FirebaseUser } from 'firebase/auth';

interface AddTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  onAddTerm: (newTerm: NauticalTerm) => Promise<void>;
  onOpenAuth: () => void;
}

export const AddTermModal: React.FC<AddTermModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddTerm,
  onOpenAuth,
}) => {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState<TermCategory>('nomenclatura-geral');
  const [importance, setImportance] = useState<TermImportance>('importante');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [examTip, setExamTip] = useState('');
  const [synonymsInput, setSynonymsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!term.trim() || !definition.trim()) {
      setErrorMessage('O termo e a definição são campos obrigatórios.');
      return;
    }

    // Generate safe alphanumeric slug id
    const slugId = term
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `termo-${Date.now()}`;

    const synonyms = synonymsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newTerm: NauticalTerm = {
      id: slugId,
      term: term.trim(),
      category,
      importance,
      definition: definition.trim(),
      example: example.trim() || undefined,
      examTip: examTip.trim() || undefined,
      synonyms: synonyms.length > 0 ? synonyms : undefined,
      authorId: currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      await onAddTerm(newTerm);
      onClose();
      // Reset form
      setTerm('');
      setDefinition('');
      setExample('');
      setExamTip('');
      setSynonymsInput('');
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Falha ao guardar o termo no Cloud Firestore.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-400">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Adicionar Termo Náutico</h3>
              <p className="text-xs text-slate-400">Guardado no Cloud Firestore (carta-de-marinheiro)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="rounded-xl bg-rose-950/40 border border-rose-500/40 p-3 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Termo Náutico (em Português) *
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ex.: Verdugo, Bicheiro, Amura..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Categoria do Programa *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TermCategory)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Importância no Exame *
              </label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as TermImportance)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="essencial">Exame Obrigatório</option>
                <option value="importante">Muito Importante</option>
                <option value="complementar">Complementar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Definição Oficial * (máx. 2000 carateres)
            </label>
            <textarea
              required
              rows={3}
              maxLength={2000}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Explicação clara e rigorosa de acordo com a nomenclatura marítima..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Exemplo Prático a Bordo (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ex.: Ao atracar, utiliza-se o bicheiro para apanhar o cabo da poita."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Dica para Exame (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={examTip}
              onChange={(e) => setExamTip(e.target.value)}
              placeholder="Mnemónica ou pergunta frequente da DGRM..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Sinónimos / Equivalentes (separados por vírgula)
            </label>
            <input
              type="text"
              value={synonymsInput}
              onChange={(e) => setSynonymsInput(e.target.value)}
              placeholder="Ex.: Bordo falso, Fenders, Defensas"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-xs font-bold text-white hover:from-cyan-500 hover:to-blue-500 transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'A guardar...' : 'Adicionar ao Glossário'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
