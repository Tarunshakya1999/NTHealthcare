import React, { useState, useEffect } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    window.addEventListener("appinstalled", () => {
      setShowButton(false);
      console.log("PWA already installed");
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
      if (outcome === "accepted") setShowButton(false);
    } else {
      console.warn("Install prompt not available yet.");
    }
  };

  // Button only visible when prompt is ready
  if (!showButton) return null;

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