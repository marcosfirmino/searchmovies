"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl } from "@/services/tmdb";
import { formatYear, formatRating } from "@/utils/formatters";
import Button from "@/components/ui/Button";
import { useMovieDetail } from "@/hooks/useMovieDetail";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Footer from "@/app/_components/Footer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import TechInfoSection from "@/components/movies/TechInfoSection";
import StreamingProvidersSection from "@/components/movies/StreamingProvidersSection";
import CastCarousel from "@/components/movies/CastCarousel";
import MovieCarouselModern from "@/components/movies/MovieCarouselModern";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [heroImgSrc, setHeroImgSrc] = useState("/placeholder.png");
  const [posterImgSrc, setPosterImgSrc] = useState("/placeholder.png");
  const [heroError, setHeroError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    movie,
    videoKey,
    cast,
    director,
    certification,
    recommendedMovies,
    watchProviders,
    loading,
    error,
  } = useMovieDetail(id);

  useEffect(() => {
    if (movie) {
      if (movie.backdrop_path) {
        setHeroImgSrc(getImageUrl(movie.backdrop_path, "original"));
        setHeroError(false);
      }
      if (movie.poster_path) {
        setPosterImgSrc(getImageUrl(movie.poster_path, "w500"));
        setPosterError(false);
      }
    }
  }, [movie]);

  const handleHeroError = () => {
    if (!heroError) {
      setHeroError(true);
      setHeroImgSrc("/placeholder.png");
    }
  };

  const handlePosterError = () => {
    if (!posterError) {
      setPosterError(true);
      setPosterImgSrc("/placeholder.png");
    }
  };

  const handleMovieClick = (movie) => {
    router.push(`/movie/${movie.id}`);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] bg-gray-800">
        <div className="absolute inset-0">
          <img
            src={heroImgSrc}
            onError={handleHeroError}
            className="w-full h-full object-cover opacity-60 transition-opacity"
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/30 to-transparent"></div>
          
          {/* Botão Play Trailer */}
          {videoKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              aria-label="Reproduzir trailer"
            >
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-red-600/80 hover:border-red-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white group-hover:scale-110 transition-transform"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-white font-semibold text-base">Assistir Trailer</span>
              </div>
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row gap-10 items-start">
          {/* Poster Flutuante */}
          <div className="hidden md:block w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-gray-800">
            <img
              src={posterImgSrc}
              onError={handlePosterError}
              className="w-full h-full object-cover"
              alt={movie.title}
            />
          </div>

          {/* Informações Principais */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              {movie.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded text-xs uppercase tracking-wider"
                >
                  {genre.name}
                </span>
              ))}
              {certification && (
                <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded text-xs font-semibold">
                  {certification}
                </span>
              )}
              <span className="px-3 py-1 bg-yellow-500 text-black rounded text-sm font-extrabold">
                {formatRating(movie.vote_average)} IMDb
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-none">
              {movie.title}
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
              {movie.overview || "Sinopse não disponível."}
            </p>

            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <a href={`/watch/${movie.id}`}>
                <Button variant="primary" size="md" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Assistir Agora
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Abaixo do Hero */}
      <div className="relative z-10 px-8 md:px-16 pt-20 pb-24 space-y-16">
        {/* Infos Técnicas */}
        <TechInfoSection
          director={director}
          releaseDate={movie.release_date}
          budget={movie.budget}
          revenue={movie.revenue}
          runtime={movie.runtime}
        />

        {/* Plataformas de Streaming */}
        <StreamingProvidersSection watchProviders={watchProviders} />

        {/* Carrossel de Elenco */}
        <CastCarousel cast={cast} />

        {/* Carrossel de Relacionados */}
        {recommendedMovies.length > 0 && (
          <MovieCarouselModern
            title="Você também pode gostar"
            movies={recommendedMovies.slice(0, 10)}
            onMovieClick={handleMovieClick}
          />
        )}
      </div>

      {/* Modal do Trailer */}
      {showTrailer && videoKey && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
              aria-label="Fechar trailer"
            >
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
