import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  Send,
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
          // Diagnostic JSON logged inside handleFirestoreError
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
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="font-mono-naut text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Comunicação &amp; Feedback · {CONTACT_RECIPIENT}
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Contacto
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Envie questões, sugestões de termos náuticos ou reporte erros de conteúdo. As mensagens submetidas são guardadas na base de dados para{' '}
            <a
              href={`mailto:${CONTACT_RECIPIENT}`}
              className="font-mono-naut font-semibold text-foreground underline underline-offset-4 hover:text-[#9a7413]"
            >
              {CONTACT_RECIPIENT}
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6">
        {submittedSnapshot && (
          <div className="space-y-3 border border-[#1e7d4f]/50 bg-[#e6f4ec] p-6 text-foreground shadow-[6px_6px_0_0_#1e7d4f]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1e7d4f]" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Mensagem registada com sucesso!
                </h3>
                <p className="mt-1 text-sm text-foreground/85">
                  A sua mensagem («<strong>{submittedSnapshot.subject}</strong>») foi guardada na base de dados para{' '}
                  <strong className="font-mono-naut">{CONTACT_RECIPIENT}</strong>
                  {currentUser ? ' e associada à sua conta.' : '.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={submittedSnapshot.mailtoHref}
                className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#ca9e1c]" />
                <span>Abrir no cliente de e-mail ({CONTACT_RECIPIENT})</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedSnapshot(null)}
                className="font-mono-naut min-h-11 border border-border bg-card px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:bg-secondary cursor-pointer"
              >
                Enviar outra mensagem
              </button>
            </div>
          </div>
        )}

        <section className="border border-border bg-card p-6 sm:p-8">
          {currentUser && (
            <div className="mb-6 flex items-center gap-2.5 border border-border bg-secondary/60 px-4 py-2.5 text-xs text-foreground">
              <UserCheck className="h-4 w-4 shrink-0 text-[#1e7d4f]" />
              <span>
                Sessão iniciada como{' '}
                <strong>{currentUser.displayName || currentUser.email || 'Utilizador'}</strong>. Os dados da sua conta serão guardados junto com a mensagem.
              </span>
            </div>
          )}

          {submitError && (
            <div className="mb-6 flex items-start gap-2.5 border border-destructive/50 bg-[#f3ded9] p-4 text-xs sm:text-sm text-[#7a2316]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono-naut mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
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
                  className="h-12 w-full border border-border bg-background px-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-mono-naut mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
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
                  className="h-12 w-full border border-border bg-background px-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="font-mono-naut mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
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
                className="h-12 w-full border border-border bg-background px-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="font-mono-naut mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
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
                className="w-full border border-border bg-background p-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              />
              <div className="mt-1 flex items-center justify-between font-mono-naut text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                <span>Destino: {CONTACT_RECIPIENT}</span>
                <span>{message.length}/4000 carateres</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                A submissão guarda uma cópia na base de dados Cloud Firestore.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono-naut inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#082b3f] disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#ca9e1c]" />
                <span>{isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
