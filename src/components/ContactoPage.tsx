import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  Mail,
  Send,
  Compass,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface ContactoPageProps {
  currentUser: FirebaseUser | null;
}

const CONTACT_RECIPIENT = 'nuno@rippleseed.co';

export const ContactoPage: React.FC<ContactoPageProps> = ({ currentUser }) => {
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    mailtoHref: string;
  } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName((prev) => prev || currentUser.displayName || '');
      setEmail((prev) => prev || currentUser.email || '');
    }
  }, [currentUser]);

  const buildMailtoHref = (n: string, e: string, s: string, m: string) => {
    const mailSubject = encodeURIComponent(`[Carta de Marinheiro] ${s}`);
    const userLine = currentUser
      ? `\nConta autenticada: ${currentUser.displayName || 'Sem nome'} (${currentUser.email || currentUser.uid})`
      : '';
    const mailBody = encodeURIComponent(
      `De: ${n} <${e}>${userLine}\n\n${m}`
    );
    return `mailto:${CONTACT_RECIPIENT}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 120) {
      setSubmitError('Por favor, indique o seu nome (entre 2 e 120 carateres).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 160) {
      setSubmitError('Por favor, indique um endereço de e-mail válido.');
      return;
    }
    if (trimmedSubject.length < 2 || trimmedSubject.length > 180) {
      setSubmitError('Por favor, indique um assunto (entre 2 e 180 carateres).');
      return;
    }
    if (trimmedMessage.length < 5 || trimmedMessage.length > 4000) {
      setSubmitError('A mensagem deve ter entre 5 e 4000 carateres.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: Record<string, unknown> = {
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        recipient: CONTACT_RECIPIENT,
        createdAt: serverTimestamp(),
      };

      if (currentUser) {
        payload.userId = currentUser.uid;
        if (currentUser.email) {
          payload.userEmail = currentUser.email.slice(0, 160);
        }
        if (currentUser.displayName) {
          payload.userDisplayName = currentUser.displayName.slice(0, 120);
        }
      }

      try {
        await addDoc(collection(db, 'contact_messages'), payload);
      } catch (firestoreErr) {
        try {
          handleFirestoreError(firestoreErr, OperationType.CREATE, 'contact_messages');
        } catch {
          // Diagnostic JSON logged inside handleFirestoreError; surface clean message in UI
        }
        throw firestoreErr;
      }

      const mailtoHref = buildMailtoHref(
        trimmedName,
        trimmedEmail,
        trimmedSubject,
        trimmedMessage
      );

      setSubmittedSnapshot({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        mailtoHref,
      });

      setSubject('');
      setMessage('');
    } catch {
      setSubmitError(
        `Não foi possível guardar a mensagem na base de dados. Pode enviar diretamente para ${CONTACT_RECIPIENT}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section className="rounded-xs border border-[#d7d0c1] bg-[#ede9de]/45 p-6 sm:p-8">
        <div className="flex items-center gap-2 font-mono-naut text-[11px] uppercase tracking-[0.12em] text-[#4f6e82] mb-2.5">
          <Compass className="w-4 h-4 text-[#9a7413]" />
          <span>Comunicação &amp; Feedback</span>
          <span aria-hidden="true" className="text-[#d7d0c1]">·</span>
          <span>{CONTACT_RECIPIENT}</span>
        </div>

        <h2 className="font-maritime text-3xl sm:text-5xl font-bold text-[#0b3a55] tracking-tight leading-tight flex items-center gap-3">
          <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#9a7413] shrink-0" />
          <span>Contacto</span>
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-[#4f6e82] leading-relaxed max-w-2xl">
          Envie questões, sugestões de termos náuticos ou reporte erros de conteúdo. Todas as mensagens são registadas na base de dados com destino a{' '}
          <a
            href={`mailto:${CONTACT_RECIPIENT}`}
            className="font-mono-naut font-semibold text-[#0b3a55] underline decoration-dotted hover:text-[#9a7413]"
          >
            {CONTACT_RECIPIENT}
          </a>
          .
        </p>
      </section>

      {/* Success Confirmation */}
      {submittedSnapshot && (
        <div className="rounded-xs border border-[#1e7d4f]/40 bg-[#e6f4ec] p-6 text-[#0b3a55] space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1e7d4f] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-maritime text-lg font-bold text-[#0b3a55]">
                Mensagem registada com sucesso!
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#0b3a55]/85">
                A sua mensagem («<strong>{submittedSnapshot.subject}</strong>») foi guardada na base de dados para{' '}
                <strong className="font-mono-naut">{CONTACT_RECIPIENT}</strong>
                {currentUser ? ' e associada à sua conta.' : '.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={submittedSnapshot.mailtoHref}
              className="inline-flex items-center gap-2 rounded-xs bg-[#0b3a55] px-4 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#faf7f0] hover:bg-[#082b3f] transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ca9e1c]" />
              <span>Abrir no cliente de e-mail ({CONTACT_RECIPIENT})</span>
            </a>

            <button
              type="button"
              onClick={() => setSubmittedSnapshot(null)}
              className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] px-4 py-2 font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#0b3a55] hover:border-[#0b3a55] transition cursor-pointer"
            >
              Enviar outra mensagem
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <section className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-6 sm:p-8">
        {/* Logged in user status */}
        {currentUser && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xs border border-[#0b3a55]/20 bg-[#ede9de]/50 px-4 py-2.5 text-xs text-[#0b3a55]">
            <UserCheck className="w-4 h-4 text-[#1e7d4f] shrink-0" />
            <span>
              Sessão iniciada como{' '}
              <strong>{currentUser.displayName || currentUser.email || 'Utilizador'}</strong>. Os dados da sua conta serão guardados junto com a mensagem.
            </span>
          </div>
        )}

        {submitError && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xs border border-[#b3402f]/40 bg-[#f3ded9] p-4 text-xs sm:text-sm text-[#7a2316]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82] mb-1.5"
              >
                Nome *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="O seu nome"
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] px-3.5 py-2.5 text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:bg-[#fcfbf8] focus:outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82] mb-1.5"
              >
                E-mail *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                maxLength={160}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.pt"
                className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] px-3.5 py-2.5 text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:bg-[#fcfbf8] focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82] mb-1.5"
            >
              Assunto *
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              maxLength={180}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex.: Sugestão de termo, dúvida sobre balões RIEAM..."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] px-3.5 py-2.5 text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:bg-[#fcfbf8] focus:outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono-naut text-[11px] uppercase tracking-wider font-medium text-[#4f6e82] mb-1.5"
            >
              Mensagem *
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              maxLength={4000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva aqui a sua mensagem..."
              className="w-full rounded-xs border border-[#d3ccbb] bg-[#faf7f0] p-3.5 text-sm text-[#0b3a55] placeholder:text-[#4f6e82]/60 focus:border-[#0b3a55] focus:bg-[#fcfbf8] focus:outline-none transition"
            />
            <div className="mt-1 flex items-center justify-between font-mono-naut text-[10px] text-[#4f6e82]">
              <span>Destino: {CONTACT_RECIPIENT}</span>
              <span>{message.length}/4000 carateres</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#d7d0c1]">
            <p className="text-xs text-[#4f6e82]">
              A submissão guarda uma cópia na base de dados Cloud Firestore.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xs bg-[#0b3a55] px-5 py-2.5 font-mono-naut text-xs uppercase tracking-[0.08em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#ca9e1c]" />
              <span>{isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
