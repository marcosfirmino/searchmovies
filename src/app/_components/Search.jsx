"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  console.log("API Key na Vercel:", process.env.NEXT_PUBLIC_TMDB_API_KEY);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Barra de busca */}
      <form onSubmit={searchMovies} className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar por um Filme ou Série..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 text-lg border border-gray-300 rounded-full w-3/4 md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button
          className="ml-2 px-6 py-2 bg-slate-800 text-white rounded-full text-lg hover:bg-slate-700 transition-all"
          type="submit"
        >
          Buscar
        </button>
      </form>

      {/* Mensagens de status */}
      {loading && <p className="text-center text-3xl font-bold p-2">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {movies.length === 0 && !loading && !error && query && (
        <p className="text-center ">Nenhum filme encontrado! Tente novamente.</p>
      )}

      {/* Resultados da busca */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
            <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/placeholder.jpg\\" // Imagem padrão para filmes sem pôster
                }
                alt={movie.title}
                className="w-full border"
              />
                <p className="p-2 text-center text-sm">
                  <span className="font-semibold">{movie.title}</span> <span className="text-gray-400">({movie.release_date?.split("-")[0]}) ⭐ {movie.vote_average?.toFixed(1)}</span>
                </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}