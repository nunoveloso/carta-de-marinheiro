import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-950/90 backdrop-blur-md px-4 py-2 text-xs md:text-sm font-medium text-amber-200 shadow-xl shadow-amber-950/50 animate-bounce duration-1000">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Modo Offline — O glossário em cache continua disponível para estudo.</span>
    </div>
  );
};
