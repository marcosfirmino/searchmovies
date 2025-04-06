"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Footer from "@/app/_components/Footer";

export default function WatchMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const embedUrl = `https://vidsrc.to/embed/movie/${id}`;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error("Erro ao buscar os dados do filme:", err));
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-4 p-2">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center pb-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400">({new Date(movie.release_date).getFullYear()}) ⭐{movie.vote_average.toFixed(1)}</p>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen></iframe></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}