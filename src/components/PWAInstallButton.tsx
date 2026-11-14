import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone PWA mode, don't show prompt
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex min-h-11 items-center gap-1.5 whitespace-nowrap shrink-0 bg-primary px-3 font-mono-naut text-[11px] uppercase tracking-[0.12em] font-medium text-primary-foreground hover:bg-[#082b3f] transition border border-primary cursor-pointer"
        title="Instalar App no dispositivo"
      >
        <Download className="w-3.5 h-3.5 text-[#ca9e1c]" />
        <span className="hidden sm:inline">Instalar App</span>
        <span className="sm:hidden">Instalar</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex min-h-11 items-center gap-1.5 whitespace-nowrap shrink-0 border border-border bg-secondary px-3 font-mono-naut text-[11px] uppercase tracking-[0.12em] font-medium text-foreground hover:border-primary transition cursor-pointer"
          title="Instalar no iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-foreground" />
          <span>Instalar iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3a55]/45 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm border border-primary bg-card p-6 shadow-[6px_6px_0_0_#0b3a55] text-foreground animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-secondary border border-border text-foreground">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground font-maritime text-xl">
                    Instalar no iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start gap-3 bg-background p-3 border border-border">
                  <div className="mt-0.5 bg-card p-1.5 text-foreground border border-border">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <p>
                    1. No navegador Safari, toque no botão de <strong className="text-foreground">Partilhar</strong> na barra inferior.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-background p-3 border border-border">
                  <div className="mt-0.5 bg-card p-1.5 text-foreground border border-border">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <p>
                    2. Deslize para baixo e selecione <strong className="text-foreground">Ecrã Principal</strong> (Add to Home Screen).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full bg-primary py-2.5 font-mono-naut text-xs uppercase tracking-[0.12em] font-medium text-primary-foreground hover:bg-[#082b3f] transition cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
