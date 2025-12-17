"use client";

import { useState } from "react";
import { getImageUrl } from "@/services/tmdb";
import { formatYear, formatRating } from "@/utils/formatters";

/**
 * Componente MovieCard com fallback de imagem
 * 
 * CARACTERÍSTICAS:
 * - Fallback automático se a imagem falhar
 * - Hover effects modernos
 * - Overlay com informações no hover
 * - Integrado com serviços da aplicação
 */
export default function MovieCard({ movie, onClick }) {
  const [imgSrc, setImgSrc] = useState(
    movie.poster_path ? getImageUrl(movie.poster_path, "w300") : "/placeholder.png"
  );
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc("/placeholder.png");
    }
  };

  if (!movie) return null;

  return (
    <div
      onClick={() => onClick?.(movie)}
      className="group relative flex-shrink-0 w-[200px] cursor-pointer transition-all duration-300 hover:z-20"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_8px_25px_rgba(239,68,68,0.3),0_0_12px_rgba(239,68,68,0.15)]">
        <img
          src={imgSrc}
          alt={movie.title}
          onError={handleImageError}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          loading="lazy"
        />

        {/* Overlay info on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg leading-tight">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
              {formatRating(movie.vote_average)}
            </span>
            <span>{formatYear(movie.release_date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}