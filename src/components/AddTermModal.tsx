import React, { useState } from 'react';
import { X, Plus, AlertCircle, Ship } from 'lucide-react';
import { TermCategory, TermImportance, NauticalTerm, SubCategory, TAXONOMY_TREE, MainCategory } from '../types/glossary';
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
  const [category, setCategory] = useState<TermCategory>('Marinharia');
  const [subCategory, setSubCategory] = useState<SubCategory>('Nomenclatura');
  const [pageNumber, setPageNumber] = useState<string>('');
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

    const parsedPage = parseInt(pageNumber, 10);

    const newTerm: NauticalTerm = {
      id: slugId,
      term: term.trim(),
      category,
      subCategory,
      subcategory: subCategory,
      page: !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : undefined,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3a55]/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-xs border border-[#0b3a55] bg-[#fcfbf8] shadow-[6px_6px_0_0_#0b3a55] text-[#0b3a55] my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#d7d0c1] px-6 py-5 bg-[#faf7f0]">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xs bg-[#fcfbf8] p-2 text-[#0b3a55] border border-[#d7d0c1]">
              <Ship className="w-5 h-5 text-[#9a7413]" />
            </div>
            <div>
              <h3 className="font-maritime text-2xl font-bold text-[#0b3a55]">Adicionar Termo Náutico</h3>
              <p className="font-mono-naut text-[10px] uppercase tracking-[0.08em] text-[#4f6e82]">Cloud Firestore • carta-de-marinheiro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xs p-1.5 text-[#4f6e82] hover:text-[#0b3a55] hover:bg-[#ede9de] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="rounded-xs bg-[#f3ded9] border border-[#b3402e] p-3 text-xs text-[#b3402e] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#b3402e] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
              Termo Náutico (em Português) *
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ex.: Verdugo, Bicheiro, Amura..."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-3 text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                Categoria do Programa *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const newCat = e.target.value as MainCategory;
                  setCategory(newCat);
                  const validSubs = TAXONOMY_TREE[newCat];
                  if (validSubs && validSubs.length > 0) {
                    setSubCategory(validSubs[0]);
                  }
                }}
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-2.5 text-xs text-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-semibold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                Subcategoria Oficial *
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value as SubCategory)}
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-2.5 text-xs text-[#0b3a55] focus:border-[#0b3a55] focus:outline-none font-semibold"
              >
                {(TAXONOMY_TREE[category as MainCategory] || []).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                Importância no Exame *
              </label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as TermImportance)}
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-2.5 text-xs text-[#0b3a55] focus:border-[#0b3a55] focus:outline-none"
              >
                <option value="essencial">Exame Obrigatório</option>
                <option value="importante">Muito Importante</option>
                <option value="complementar">Complementar</option>
              </select>
            </div>

            <div>
              <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
                Página do Manual (opcional)
              </label>
              <input
                type="number"
                min={1}
                max={200}
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
                placeholder="Ex.: 4"
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-2.5 font-mono-naut text-xs text-[#0b3a55] focus:border-[#0b3a55] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
              Definição Oficial * (máx. 2000 carateres)
            </label>
            <textarea
              required
              rows={3}
              maxLength={2000}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Explicação clara e rigorosa de acordo com a nomenclatura marítima..."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
              Exemplo Prático a Bordo (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ex.: Ao atracar, utiliza-se o bicheiro para apanhar o cabo da poita."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
              Dica para Exame (opcional)
            </label>
            <input
              type="text"
              maxLength={500}
              value={examTip}
              onChange={(e) => setExamTip(e.target.value)}
              placeholder="Mnemónica ou pergunta frequente da DGRM..."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-3 text-xs sm:text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-naut text-[10px] uppercase tracking-[0.1em] font-medium text-[#4f6e82] mb-1">
              Outras designações (separadas por vírgula)
            </label>
            <input
              type="text"
              value={synonymsInput}
              onChange={(e) => setSynonymsInput(e.target.value)}
              placeholder="Ex.: Bordo falso, Fenders, Defensas"
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#fcfbf8] p-2.5 text-xs text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#d7d0c1] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xs border border-[#d7d0c1] bg-[#ede9de] px-4 py-2 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#4f6e82] hover:text-[#0b3a55] transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-xs bg-[#0b3a55] px-5 py-2 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#ca9e1c]" />
              <span>{isSubmitting ? 'A guardar...' : 'Adicionar ao Glossário'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
