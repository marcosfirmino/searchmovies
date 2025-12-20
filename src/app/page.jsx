"use client";

import { useRouter } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";
import HeroSearch from "./_components/HeroSearch";
import GenreMovieSection from "./_components/GenreMovieSection";
import MovieCarouselModern from "@/components/movies/MovieCarouselModern";
import Footer from "./_components/Footer";
import LoadingSpinner from "./_components/LoadingSpinner";
import MovieCarouselSkeleton from "@/components/movies/MovieCarouselSkeleton";
import { Flame, Star, Popcorn } from "lucide-react";

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

  return (
    <div className="min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Hero Section com Busca */}
      <HeroSearch onMovieClick={handleMovieClick} />

      {/* Main Content - Carrosséis */}
      <main className="space-y-4">
        {/* Seção de Gêneros */}
        <GenreMovieSection onMovieClick={handleMovieClick} />

        {/* Skeletons durante carregamento inicial */}
        {isInitialLoading ? (
          <>
            <MovieCarouselSkeleton title="Em Alta" />
            <MovieCarouselSkeleton title="Bem Avaliados" />
            <MovieCarouselSkeleton title="Nos Cinemas" />
          </>
        ) : (
          <>
            {/* Carrosséis de Filmes Populares */}
            {popularMovies.loading && popularMovies.movies.length === 0 ? (
              <MovieCarouselSkeleton title="Em Alta" />
            ) : popularMovies.movies.length > 0 ? (
              <MovieCarouselModern
                title={
                  <span className="inline-flex items-center gap-2">
                    Em Alta <Flame className="w-6 h-6 text-red-600 flex-shrink-0" />
                  </span>
                }
                movies={popularMovies.movies}
                onMovieClick={handleMovieClick}
              />
            ) : null}

            {topRatedMovies.loading && topRatedMovies.movies.length === 0 ? (
              <MovieCarouselSkeleton title="Bem Avaliados" />
            ) : topRatedMovies.movies.length > 0 ? (
              <MovieCarouselModern
                title={
                  <span className="inline-flex items-center gap-2">
                    Bem Avaliados <Star className="w-6 h-6 text-red-600 flex-shrink-0" />
                  </span>
                }
                movies={topRatedMovies.movies}
                onMovieClick={handleMovieClick}
              />
            ) : null}

            {nowPlayingMovies.loading && nowPlayingMovies.movies.length === 0 ? (
              <MovieCarouselSkeleton title="Nos Cinemas" />
            ) : nowPlayingMovies.movies.length > 0 ? (
              <MovieCarouselModern
                title={
                  <span className="inline-flex items-center gap-2">
                    Nos Cinemas <Popcorn className="w-6 h-6 text-red-600 flex-shrink-0" />
                  </span>
                }
                movies={nowPlayingMovies.movies}
                onMovieClick={handleMovieClick}
              />
            ) : null}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}