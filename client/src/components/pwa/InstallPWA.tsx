"use client";

import { useEffect, useState } from "react";
import { Download, X, GraduationCap } from "lucide-react";
import { is, se, tr } from "date-fns/locale";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    setIsStandalone(checkStandalone);

    if (checkStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (dismissed) {
        const dismissedTime = parseInt(dismissed);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedTime < sevenDays) return;
      }

      // Install option available, show the popup
      setIsOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Update isOpen based on deferredPrompt availability
  useEffect(() => {
    if (deferredPrompt) {
      setIsOpen(true);
    }
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsOpen(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🚫 Install prompt dismissed");
    setIsOpen(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  const isDebugMode = process.env.NODE_ENV === "development";

  // Don't render if already installed
  if (isStandalone) {
    return null;
  }

  // Don't render if not open (including debug mode)
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-blue-50 p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* App Icon Container */}
            <div className="bg-primary p-2 rounded-lg shadow-md shadow-blue-200">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 leading-tight">
                Install ClassFlow
                {isDebugMode && !deferredPrompt && (
                  <span className="ml-1 text-xxs text-blue-400 font-normal">
                    (Debug)
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Faster access & offline learning
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            type="button"
            className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all -mr-1 -mt-1 shrink-0"
            aria-label="Dismiss install prompt"
            title="Dismiss"
          >
            <X size={18} />
          </button>
        </div>

        <button
          onClick={handleInstallClick}
          disabled={!deferredPrompt && !isDebugMode}
          className={`w-full text-white text-xxsm font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
            deferredPrompt || isDebugMode
              ? "bg-primary hover:bg-[#2992ed] shadow-lg shadow-blue-100 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Download size={14} strokeWidth={2.5} />
          Install Now
        </button>
      </div>
    </div>
  );
}
