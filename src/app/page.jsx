"use client";

import { useRouter } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";
import HeroSearch from "./_components/HeroSearch";
import GenreMovieSection from "./_components/GenreMovieSection";
import MovieCarouselModern from "@/components/movies/MovieCarouselModern";
import Footer from "./_components/Footer";
import LoadingSpinner from "./_components/LoadingSpinner";

export default function Home() {
  const router = useRouter();

  // Busca listas de filmes
  const popularMovies = useMovies("movie/popular");
  const topRatedMovies = useMovies("movie/top_rated");
  const nowPlayingMovies = useMovies("movie/now_playing");

  const handleMovieClick = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  // Verifica se está no carregamento inicial (quando nenhum filme foi carregado ainda)
  const isInitialLoading = 
    (popularMovies.loading && popularMovies.movies.length === 0) ||
    (topRatedMovies.loading && topRatedMovies.movies.length === 0) ||
    (nowPlayingMovies.loading && nowPlayingMovies.movies.length === 0);

  // Se está carregando inicialmente, mostra apenas o spinner centralizado
  if (isInitialLoading) {
    return (
      <div className="min-h-screen font-sans selection:bg-red-600 selection:text-white flex items-center justify-center bg-[#020617]">
        <LoadingSpinner size="large" className="py-0" />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Hero Section com Busca */}
      <HeroSearch onMovieClick={handleMovieClick} />

      {/* Main Content - Carrosséis */}
      <main className="space-y-4">
        {/* Seção de Gêneros */}
        <GenreMovieSection onMovieClick={handleMovieClick} />

        {/* Carrosséis de Filmes Populares */}
        {popularMovies.movies.length > 0 && (
          <MovieCarouselModern
            title="Em Alta 🔥"
            movies={popularMovies.movies}
            onMovieClick={handleMovieClick}
          />
        )}

        {topRatedMovies.movies.length > 0 && (
          <MovieCarouselModern
            title="Bem Avaliados 🧐"
            movies={topRatedMovies.movies}
            onMovieClick={handleMovieClick}
          />
        )}

        {nowPlayingMovies.movies.length > 0 && (
          <MovieCarouselModern
            title="Nos Cinemas 🍿"
            movies={nowPlayingMovies.movies}
            onMovieClick={handleMovieClick}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}