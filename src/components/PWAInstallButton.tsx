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
        className="flex items-center gap-2 rounded-xl bg-[#112338] px-3.5 py-2 text-xs md:text-sm font-semibold text-[#fbf8f2] shadow-sm hover:bg-[#1c3858] transition-all active:scale-95 border border-[#112338]"
        title="Instalar App no dispositivo"
      >
        <Download className="w-4 h-4 text-[#d4af37]" />
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
          className="flex items-center gap-1.5 rounded-xl border border-[#ded5c2] bg-[#f4efe4] px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:bg-[#eae3d2] transition active:scale-95"
          title="Instalar no iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#112338]" />
          <span>Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112338]/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl border border-[#ded5c2] bg-[#fdfbf7] p-6 shadow-xl text-[#1e293b] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#ded5c2]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#f4efe4] text-[#112338]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#112338] font-maritime text-xl">
                    Instalar no iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-lg p-1.5 text-[#64748b] hover:text-[#112338] hover:bg-[#f4efe4] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#475569]">
                <div className="flex items-start gap-3 rounded-xl bg-[#f7f3e8] p-3 border border-[#e8dfcf]">
                  <div className="mt-0.5 rounded-md bg-white p-1.5 text-[#112338] shadow-2xs">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <p>
                    1. No navegador Safari, toque no botão de <strong className="text-[#112338]">Partilhar</strong> na barra inferior.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#f7f3e8] p-3 border border-[#e8dfcf]">
                  <div className="mt-0.5 rounded-md bg-white p-1.5 text-[#112338] shadow-2xs">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <p>
                    2. Deslize para baixo e selecione <strong className="text-[#112338]">Ecrã Principal</strong> (Add to Home Screen).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#112338] py-2.5 text-xs font-semibold text-[#fbf8f2] hover:bg-[#1c3858] transition"
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
