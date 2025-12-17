"use client";

/**
 * Componente GenreTag - Botão de filtro de gênero
 * 
 * CARACTERÍSTICAS:
 * - Estado ativo/inativo visual
 * - Hover effects
 * - Design moderno com glassmorphism
 */
export default function GenreTag({ label, active, onClick }) {
  return (
    <button
      onClick={() => onClick?.(label)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer ${
        active
          ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}