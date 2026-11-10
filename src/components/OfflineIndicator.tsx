import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-[#d5a847]/40 bg-[#fefce8] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#854d0e] shadow-lg shadow-[#854d0e]/10">
      <WifiOff className="w-4 h-4 text-[#a16207] shrink-0" />
      <span>Modo Offline — O glossário em cache continua disponível para consulta.</span>
    </div>
  );
};
