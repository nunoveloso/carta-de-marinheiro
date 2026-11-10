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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112338]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ded5c2] bg-[#fdfbf7] shadow-xl text-[#1e293b] my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#ded5c2] px-6 py-5 bg-[#f4efe4]">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-white p-2 text-[#112338] border border-[#ded5c2] shadow-2xs">
              <Ship className="w-5 h-5 text-[#a16207]" />
            </div>
            <div>
              <h3 className="font-maritime text-2xl font-bold text-[#112338]">Adicionar Termo Náutico</h3>
              <p className="text-xs text-[#64748b]">Guardado no Cloud Firestore (carta-de-marinheiro)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#64748b] hover:text-[#112338] hover:bg-[#eae3d2] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-xs text-[#991b1b] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Termo Náutico (em Português) *
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ex.: Verdugo, Bicheiro, Amura..."
              className="w-full rounded-xl border border-[#ded5c2] bg-white p-3 text-sm text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Categoria do Programa *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TermCategory)}
                className="w-full rounded-xl border border-[#ded5c2] bg-white p-2.5 text-xs text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Importância no Exame *
              </label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as TermImportance)}
                className="w-full rounded-xl border border-[#ded5c2] bg-white p-2.5 text-xs text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
              >
                <option value="essencial">Exame Obrigatório</option>
                <option value="importante">Muito Importante</option>
                <option value="complementar">Complementar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Definição Oficial * (máx. 2000 carateres)
            </label>
            <textarea
              required
              rows={3}
              maxLength={2000}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Explicação clara e rigorosa de acordo com a nomenclatura marítima..."
              className="w-full rounded-xl border border-[#ded5c2] bg-white p-3 text-xs sm:text-sm text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Exemplo Prático a Bordo (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ex.: Ao atracar, utiliza-se o bicheiro para apanhar o cabo da poita."
              className="w-full rounded-xl border border-[#ded5c2] bg-white p-3 text-xs sm:text-sm text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Dica para Exame (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={examTip}
              onChange={(e) => setExamTip(e.target.value)}
              placeholder="Mnemónica ou pergunta frequente da DGRM..."
              className="w-full rounded-xl border border-[#ded5c2] bg-white p-3 text-xs sm:text-sm text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Outras designações (separadas por vírgula)
            </label>
            <input
              type="text"
              value={synonymsInput}
              onChange={(e) => setSynonymsInput(e.target.value)}
              placeholder="Ex.: Bordo falso, Fenders, Defensas"
              className="w-full rounded-xl border border-[#ded5c2] bg-white p-2.5 text-xs text-[#1e293b] focus:border-[#112338] focus:outline-none shadow-2xs"
            />
          </div>

          <div className="pt-3 border-t border-[#ded5c2] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-[#64748b] hover:bg-[#eae3d2] transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-xl bg-[#112338] px-5 py-2 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-[#d4af37]" />
              <span>{isSubmitting ? 'A guardar...' : 'Adicionar ao Glossário'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
