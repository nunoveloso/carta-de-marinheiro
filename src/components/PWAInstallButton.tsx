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
        className="flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs bg-[#0b3a55] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition border border-[#0b3a55] cursor-pointer"
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
          className="flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xs border border-[#d7d0c1] bg-[#ede9de] px-3 py-1.5 font-mono-naut text-[11px] uppercase tracking-[0.08em] font-medium text-[#0b3a55] hover:bg-[#eae6dc] hover:border-[#0b3a55] transition cursor-pointer"
          title="Instalar no iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#0b3a55]" />
          <span>Instalar iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3a55]/45 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-xs border border-[#0b3a55] bg-[#fcfbf8] p-6 shadow-[6px_6px_0_0_#0b3a55] text-[#0b3a55] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#d7d0c1]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xs bg-[#ede9de] border border-[#d7d0c1] text-[#0b3a55]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0b3a55] font-maritime text-xl">
                    Instalar no iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-xs p-1.5 text-[#4f6e82] hover:text-[#0b3a55] hover:bg-[#ede9de] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#4f6e82]">
                <div className="flex items-start gap-3 rounded-xs bg-[#faf7f0] p-3 border border-[#d7d0c1]">
                  <div className="mt-0.5 rounded-xs bg-[#fcfbf8] p-1.5 text-[#0b3a55] border border-[#d7d0c1]">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <p>
                    1. No navegador Safari, toque no botão de <strong className="text-[#0b3a55]">Partilhar</strong> na barra inferior.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xs bg-[#faf7f0] p-3 border border-[#d7d0c1]">
                  <div className="mt-0.5 rounded-xs bg-[#fcfbf8] p-1.5 text-[#0b3a55] border border-[#d7d0c1]">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <p>
                    2. Deslize para baixo e selecione <strong className="text-[#0b3a55]">Ecrã Principal</strong> (Add to Home Screen).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xs bg-[#0b3a55] py-2.5 font-mono-naut text-xs uppercase tracking-[0.1em] font-medium text-[#faf7f0] hover:bg-[#082b3f] transition cursor-pointer"
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
