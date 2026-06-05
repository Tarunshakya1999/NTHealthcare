import React, { useState, useEffect } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Already installed?
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Install outcome: ${outcome}`);
      setDeferredPrompt(null);
      if (outcome === "accepted") setIsInstalled(true);
    } else {
      // Manual instructions for laptop / unsupported browsers
      alert(
        "Install NT Healthcare App manually:\n\n" +
        "📱 Mobile (Chrome/Edge):\n" +
        "• Tap the three‑dot menu → 'Install app' or 'Add to Home Screen'\n\n" +
        "💻 Laptop (Chrome/Edge):\n" +
        "• Click the install icon (⊕) in the address bar\n" +
        "• Or go to Menu → 'Install NT Healthcare...'"
      );
    }
  };

  // Hamesha button dikhega jab tak app installed na ho
  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={handleInstall}
        className="install-btn"
        title="Install NT Healthcare App"
      >
        <i className="fas fa-download"></i>
      </button>

      <style>{`
        .install-btn {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          font-size: 24px;
          color: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
          transition: transform 0.3s ease;
          animation: pulse 2s infinite;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .install-btn:hover {
          transform: scale(1.1);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
          }
        }
      `}</style>
    </>
  );
}