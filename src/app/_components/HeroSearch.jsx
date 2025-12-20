"use client";

import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import MovieCard from "@/components/ui/MovieCard";
import { Search } from "lucide-react";

/**
 * Componente Hero com busca centralizada (Search-First Design)
 * 
 * CARACTERÍSTICAS:
 * - Input de busca gigante e centralizado
 * - Resultados em tempo real
 * - Design moderno com glassmorphism
 */
export default function HeroSearch({ onMovieClick }) {
  const [query, setQuery] = useState("");
  
  const { movies, loading, error } = useSearch(query);

  return (
    <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-24 xl:pt-32 2xl:pt-40 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px]"></div>
      </div>

      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold mb-4 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 tracking-tight px-4">
        O que vamos assistir hoje?
      </h1>

      {/* Input Gigante */}
      <div className="w-full max-w-3xl relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center p-2 transition-all duration-300 focus-within:bg-white/10 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/20">
          <div className="p-3 md:p-4 text-gray-400">
            <Search className="w-5 h-5 md:w-7 md:h-7" />
          </div>
          <input
            type="text"
            placeholder="Encontre seu próximo filme"
            className="w-full bg-transparent border-none outline-none text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl text-white placeholder-gray-500 h-10 sm:h-11 md:h-12 lg:h-12 xl:h-[52px] 2xl:h-14"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Resultados da Busca */}
      {query && (
        <div className="mt-12 w-full max-w-7xl">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {!loading && !error && movies.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 text-left px-4 sm:pl-8">
                Resultados da Busca
              </h2>
              <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll pb-6 md:pb-8 px-4 sm:pl-8 sm:pr-8 snap-x">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={onMovieClick}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && !error && movies.length === 0 && query && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">Nenhum título encontrado para sua busca.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}