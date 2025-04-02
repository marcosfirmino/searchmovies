"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieCarousel from "./MovieCarousel";

export default function MovieList({ title, endpoint }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${endpoint}?api_key=db7c529102dd5bbe0c3f5d7c307af628&language=pt-BR`
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