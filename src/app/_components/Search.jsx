"use client";

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import LoadingSpinner from "./LoadingSpinner"
import Logo from "./Logo"

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      if (!apiKey) {
        setError("Erro: Chave da API não definida.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`
        );
        setMovies(response.data.results || []);
      } catch (err) {
        setError("Erro ao buscar filmes. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [query, apiKey]);

  return (
    <div>
      {/* Barra de busca */}
      <div className="flex flex-col items-center mb-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full justify-center gap-2"
        >
          <input
            type="text"
            placeholder="🔎 Buscar por um Filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 text-lg border border-gray-300 rounded-full w-3/4 md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </form>
      </div>

      {/* Mensagens de status */}
      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {movies.length === 0 && !loading && !error && query && (
        <p className="text-center">Nenhum filme encontrado! Tente novamente.</p>
      )}

      {/* Exibe "Resultado da Busca" se houver filmes */}
      {movies.length > 0 && !loading && !error && (
        <h2 className="text-2xl font-semibold text-center mb-4">
          🔎 Resultado da Busca
        </h2>
      )}

      {/* Resultados da busca */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
            <div className="overflow-hidden transition-transform">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/placeholder.png"
                }
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-md border border-transparent hover:border-4 hover:border-red-600 transition duration-150"/>
              <p className="p-2 text-center text-sm">
                <span className="font-semibold">{movie.title}</span>{" "}
                <span className="text-gray-400">
                  ({movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "?"}) ⭐
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "?"}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}