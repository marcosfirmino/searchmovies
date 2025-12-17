"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetails } from "@/services/tmdb";
import { logError } from "@/utils/logger";
import { formatYear, formatRating } from "@/utils/formatters";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Footer from "@/app/_components/Footer";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function WatchMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const embedUrl = `https://vidsrc.to/embed/movie/${id}`;

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setError(null);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        logError("Erro ao buscar os dados do filme:", err);
        setError(err.message || "Erro ao carregar informações do filme.");
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-4 p-2 pt-24">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl 2xl:max-w-7xl mx-auto">
          <div className="text-center pb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {movie.title}
            </h1>
            <p className="text-gray-400 text-lg">
              ({formatYear(movie.release_date)}) ⭐
              <span className="text-yellow-400">{formatRating(movie.vote_average)}</span>
            </p>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen></iframe></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}