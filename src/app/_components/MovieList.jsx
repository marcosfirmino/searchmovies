"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieCarousel from "./MovieCarousel";

export default function MovieList({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=pt-BR`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }
    fetchMovies();
  }, [endpoint]);

  return <MovieCarousel title={title} movies={movies} />;
}