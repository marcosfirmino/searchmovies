"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl } from "@/services/tmdb";
import { formatRating } from "@/utils/formatters";
import Button from "@/components/ui/Button";
import { useMovieDetail } from "@/hooks/useMovieDetail";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Footer from "@/app/_components/Footer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import TechInfoSection from "@/components/movies/TechInfoSection";
import StreamingProvidersSection from "@/components/movies/StreamingProvidersSection";
import CastCarousel from "@/components/movies/CastCarousel";
import MovieCarouselModern from "@/components/movies/MovieCarouselModern";
import { Play, Youtube, X } from "lucide-react";

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
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[80vh] bg-gray-800">
        <div className="absolute inset-0">
          <img
            src={heroImgSrc}
            onError={handleHeroError}
            className="w-full h-full object-cover opacity-60 transition-opacity"
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/30 to-transparent"></div>
          
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-7 md:pb-8 lg:pb-10 xl:pb-12 2xl:pb-14 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 2xl:pt-40 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-start">
          {/* Poster Flutuante */}
          <div className="hidden md:block w-36 lg:w-44 xl:w-52 2xl:w-72 aspect-[2/3] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-gray-800">
            <img
              src={posterImgSrc}
              onError={handlePosterError}
              className="w-full h-full object-cover"
              alt={movie.title}
            />
          </div>

          {/* Informações Principais */}
          <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-4 2xl:space-y-8 pt-2 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-0">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 flex-wrap">
              {movie.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 2xl:px-4 2xl:py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded text-xs 2xl:text-sm uppercase tracking-wider"
                >
                  {genre.name}
                </span>
              ))}
              {certification && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 2xl:px-4 2xl:py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded text-xs 2xl:text-sm font-semibold">
                  {certification}
                </span>
              )}
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 2xl:px-4 2xl:py-1.5 bg-yellow-500 text-black rounded text-xs sm:text-xs md:text-sm xl:text-sm 2xl:text-lg font-extrabold">
                {formatRating(movie.vote_average)} IMDb
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-8xl font-bold text-white tracking-tight leading-tight md:leading-none">
              {movie.title}
            </h1>

            <p className="text-gray-300 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-relaxed">
              {movie.overview || "Sinopse não disponível."}
            </p>

            <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 flex-wrap">
              <a href={`/watch/${movie.id}`}>
                <Button variant="primary" size="md" className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base xl:text-base 2xl:text-xl">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                  Assistir Agora
                </Button>
              </a>

              {videoKey && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base xl:text-base 2xl:text-xl"
                  aria-label="Reproduzir trailer"
                >
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                  Trailer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Abaixo do Hero */}
      <div className="relative z-10 pt-[60px] px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16 2xl:pb-24 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-16">
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
            noPadding={true}
          />
        )}
      </div>

      {/* Modal do Trailer */}
      {showTrailer && videoKey && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowTrailer(false)}
        >
          <button
            onClick={() => setShowTrailer(false)}
            className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[70] p-2 sm:p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-red-600 hover:bg-black/90 hover:text-red-500 transition-all cursor-pointer"
            aria-label="Fechar trailer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}