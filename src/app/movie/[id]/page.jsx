"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Footer from "@/app/_components/Footer";
import BackButton from "@/app/_components/BackButton";
import ActorCarousel from "@/app/_components/ActorCarousel";
import RecommendedMovieCarousel from "@/app/_components/RecommendedMovieCarousel";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [certification, setCertification] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [director, setDirector] = useState("");
  const [watchProviders, setWatchProviders] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
        );
        setMovie(movieRes.data);

        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`
        );
        const trailer = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setVideoKey(trailer.key);

        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`
        );
        setCast(creditsRes.data.cast.slice(0, 12));
        const foundDirector = creditsRes.data.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(foundDirector?.name || "Não informado");

        const releaseDatesRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`
        );
        const brData = releaseDatesRes.data.results.find(
          (item) => item.iso_3166_1 === "BR"
        );
        const cert = brData?.release_dates[0]?.certification;
        setCertification(cert || "N/A");

        const recommendedRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=pt-BR`
        );
        setRecommendedMovies(
          recommendedRes.data.results.filter((movie) => movie.poster_path)
        );

        // Plataformas onde o filme está disponível no Brasil
        const providersRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
        );
        const brProviders =
          providersRes.data.results?.BR?.flatrate || [];
        setWatchProviders(brProviders);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-2 max-w-5xl mx-auto">
      <BackButton />
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-gray-400">
          ({new Date(movie.release_date).getFullYear()}) ⭐
          {movie.vote_average.toFixed(1)}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "/placeholder.png"
          }
          className="max-w-xs rounded-md shadow-md"
          alt={`Poster do filme ${movie.title}`}
        />
        <div className="space-y-4">
          <p className="text-justify">
            <strong>📖 Sinopse:</strong> {movie.overview}
          </p>

          <p>
            <strong>🎬 Diretor:</strong> {director}
          </p>

          <p>
            <strong>🔞 Classificação:</strong>{" "}
            {certification && certification !== "N/A"
              ? certification === "L"
                ? "Livre"
                : `${certification}+`
              : "Não informada"}
          </p>

          <p>
            <strong>🗓️ Data de lançamento:</strong>{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR")}
          </p>

          <p>
            <strong>💸 Orçamento:</strong>{" "}
            {movie.budget > 0
              ? movie.budget.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "USD",
                })
              : "Não informado"}
          </p>

          <p>
            <strong>💰 Receita:</strong>{" "}
            {movie.revenue > 0
              ? movie.revenue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "USD",
                })
              : "Não informada"}
          </p>

          <p>
            <strong>⌛ Duração:</strong> {Math.floor(movie.runtime / 60)}h{" "}
            {movie.runtime % 60}min
          </p>
          <p>
            <strong>🧬 Gêneros:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}.
          </p>

          {watchProviders.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <strong className="mr-2">✔️ Disponível em:</strong>
              {watchProviders.map((p) => (
                <img
                  key={p.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                  alt={p.provider_name}
                  title={p.provider_name}
                  className="h-12 rounded-sm"
                />
              ))}
            </div>
          )}

          <Link href={`/watch/${id}`}>
            <button className="mt-4 bg-red-600 font-bold inline-flex items-center gap-2 px-4 py-3 border border-white/20 rounded-md text-white hover:bg-white/10 transition duration-200 text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30">
              <span
                className="text-base leading-none translate-y-[1px]"
                aria-label={`Assistir ao filme ${movie.title}`}
              >
                🎞️
              </span>
              Assistir
            </button>
          </Link>
        </div>
      </div>

      {videoKey && (
        <div>
          <h2 className="text-xl font-semibold mb-2 mt-10">
            📺 Trailer Oficial
          </h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-md"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <ActorCarousel title="🫂 Elenco Principal" cast={cast} />
      )}

      {recommendedMovies.length > 0 && (
        <RecommendedMovieCarousel
          title="🎯 Recomendados para você"
          movies={recommendedMovies}
        />
      )}
      <Footer />
    </div>
  );
}