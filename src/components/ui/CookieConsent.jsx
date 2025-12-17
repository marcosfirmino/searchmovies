"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Componente CookieConsent - Banner de consentimento de cookies
 * 
 * CARACTERÍSTICAS:
 * - Aparece após 1.5s se o usuário não consentiu
 * - Salva preferência no localStorage
 * - Design moderno com glassmorphism
 * - Animação slide-up
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem("cookieConsent");
    if (!consented) {
      // Delay suave de 1.5s antes de mostrar
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-600"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 14v.01" />
            </svg>
            <h3 className="text-white font-semibold text-lg">
              Respeitamos sua privacidade
            </h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Utilizamos cookies para melhorar sua experiência de navegação,
            analisar tráfego e personalizar conteúdo. Ao continuar, você
            concorda com nossa{" "}
            <Link href="/" className="text-red-600 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleDismiss}
            className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Preferências
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all"
          >
            Aceitar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}

