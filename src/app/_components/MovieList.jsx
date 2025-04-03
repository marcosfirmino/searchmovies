"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieCarousel from "./MovieCarousel";

export default function MovieList({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!apiKey || !endpoint) {
      setError("Erro ao buscar filmes. Verifique a configuração da API.");
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=pt-BR`
        );
        setMovies(response.data.results || []);
      } catch (err) {
        setError("Falha ao carregar os filmes. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, apiKey]);

  if (loading) return <p>Carregando os melhores filmes...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (movies.length === 0) return <p>Nenhum filme encontrado.</p>;

  return <MovieCarousel title={title} movies={movies} />;
}