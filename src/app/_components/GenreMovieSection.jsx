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
    <div className="mb-12">
      {/* Título e Filtros de Gênero */}
      <div className="mb-8 px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🎭 Explore por Gênero
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-3">
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