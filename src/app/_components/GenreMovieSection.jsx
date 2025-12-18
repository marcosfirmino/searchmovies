"use client";

import { useEffect, useState } from "react";
import { useGenres } from "@/hooks/useGenres";
import { useMovies } from "@/hooks/useMovies";
import MovieCarouselModern from "@/components/movies/MovieCarouselModern";
import GenreTag from "@/components/ui/GenreTag";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

/**
 * Componente de Seção de Gêneros com Carrossel
 * 
 * CARACTERÍSTICAS:
 * - Mostra botões de gêneros com design moderno
 * - Quando seleciona um gênero, mostra carrossel de filmes
 * - Integrado com o novo design Search-First
 */
export default function GenreMovieSection({ onMovieClick }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  
  // Hook customizado gerencia busca de gêneros
  const { genres, loading: genresLoading, error: genresError } = useGenres();

  // Busca filmes do gênero selecionado
  const { movies, loading: moviesLoading, error: moviesError } = useMovies(
    selectedGenre ? `discover/movie?with_genres=${selectedGenre}` : null
  );

  // Seleciona o primeiro gênero automaticamente quando carregar
  useEffect(() => {
    if (genres.length > 0 && !selectedGenre) {
      setSelectedGenre(genres[0].id);
    }
  }, [genres, selectedGenre]);

  // Não mostra spinner aqui durante carregamento inicial (já é mostrado na página principal)
  if (genresLoading) {
    return null;
  }

  if (genresError) {
    return <ErrorMessage message={genresError} />;
  }

  const selectedGenreName = genres.find((g) => g.id === selectedGenre)?.name;

  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      {/* Título e Filtros de Gênero */}
      <div className="mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 md:px-8">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2 sm:gap-2 md:gap-3 pt-2 md:pt-0">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🎭 Explore por Gênero
          </span>
        </h2>
        
        {/* Select dropdown para mobile */}
        <div className="md:hidden mb-4">
          <select
            value={selectedGenre || ''}
            onChange={(e) => setSelectedGenre(Number(e.target.value))}
            className="max-w-xs bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '20px',
              paddingRight: '40px'
            }}
          >
            <option value="" disabled className="bg-[#020617] text-white">
              Selecione um gênero
            </option>
            {genres.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className="bg-[#020617] text-white"
              >
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Botões de gênero para desktop */}
        <div className="hidden md:flex flex-wrap gap-2 md:gap-3">
          {genres.map((genre) => (
            <GenreTag
              key={genre.id}
              label={genre.name}
              active={selectedGenre === genre.id}
              onClick={() => setSelectedGenre(genre.id)}
            />
          ))}
        </div>
      </div>

      {/* Carrossel de Filmes do Gênero Selecionado */}
      {selectedGenre && (
        <div>
          {moviesLoading && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}
          
          {moviesError && <ErrorMessage message={moviesError} />}
          
          {!moviesLoading && !moviesError && movies.length > 0 && (
            <MovieCarouselModern
              title={`Filmes de ${selectedGenreName}`}
              movies={movies}
              onMovieClick={onMovieClick}
            />
          )}
          
          {!moviesLoading && !moviesError && movies.length === 0 && (
            <div className="text-center py-20 text-gray-500 px-8">
              <p className="text-xl">Nenhum filme encontrado para este gênero.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}