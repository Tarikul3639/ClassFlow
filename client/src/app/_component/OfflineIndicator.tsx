"use client";

import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white py-2 px-4 text-center z-50 flex items-center justify-center gap-2">
      <WifiOff size={16} />
      <span className="text-sm font-semibold">You are offline. Some features may be limited.</span>
    </div>
  );
};