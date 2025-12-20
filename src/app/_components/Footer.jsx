"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, PenLine } from "lucide-react";


export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de newsletter
    // Newsletter subscription logic would go here
    setEmail("");
    alert("Obrigado por se inscrever!");
  };

  return (
    <footer className="relative mt-20 bg-[#020617] border-t border-white/5 pt-16 pb-8 px-8">
      {/* Efeito de brilho no topo do footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          {/* Coluna 1: Branding (4 colunas) */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-white">
              O BUSCADOR...
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Sua porta de entrada para universos infinitos. A curadoria de
              filmes mais rápida e imersiva da internet.
            </p>
            <div className="flex gap-4">
              {/* Redes sociais - você pode adicionar links reais depois */}
              {[
                { icon: "facebook" },
                { icon: "twitter" },
                { icon: "instagram" },
                { icon: "youtube" },
              ].map((social, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer"
                >
                  {social.icon === "facebook" && <Facebook className="w-[18px] h-[18px]" />}
                  {social.icon === "twitter" && <Twitter className="w-[18px] h-[18px]" />}
                  {social.icon === "instagram" && <Instagram className="w-[18px] h-[18px]" />}
                  {social.icon === "youtube" && <Youtube className="w-[18px] h-[18px]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação (2 colunas) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-semibold">Navegar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Minha Lista
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Séries
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Legal (2 colunas) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Corporativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter (4 colunas) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-semibold">Fique por dentro</h4>
            <p className="text-gray-400 text-sm">
              Receba as melhores recomendações semanalmente.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Assinar
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 O Buscador Inc. Todos os direitos reservados.
          </p>
          <div className="hidden md:flex gap-6 text-xs text-gray-500">
            <span className="cursor-pointer hover:text-white">Português (BR)</span>
            <span className="cursor-pointer hover:text-white">Ajuda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}