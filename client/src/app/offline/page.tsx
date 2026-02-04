"use client";

import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-yellow-100 rounded-full p-6">
            <WifiOff size={48} className="text-yellow-600" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-800 mb-3">
          You're Offline
        </h1>
        <p className="text-gray-600 mb-8">
          No internet connection found. Check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}