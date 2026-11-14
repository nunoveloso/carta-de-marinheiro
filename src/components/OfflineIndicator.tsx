import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-none border border-[#9a7413] bg-[#f0e8cf] px-4 py-2.5 font-mono-naut text-xs font-medium text-primary shadow-[4px_4px_0_0_#0b3a55]">
      <WifiOff className="w-4 h-4 text-[#9a7413] shrink-0" />
      <span>Modo Offline — Glossário em cache disponível.</span>
    </div>
  );
};
