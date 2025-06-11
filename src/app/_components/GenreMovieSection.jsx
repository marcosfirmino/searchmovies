"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import LoadingSpinner from "./LoadingSpinner";

export default function GenreMovieSection() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
        );
        const allGenres = res.data.genres;
        setGenres(allGenres);

        if (allGenres.length > 0) {
          setSelectedGenre(allGenres[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [apiKey]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">​​​​🎭​ Escolha um Gênero</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-2 py-2 rounded-md border-2 cursor-pointer text-md transition-150 ${
              selectedGenre === genre.id
                ? "bg-red-600 text-white "
                : "bg-white text-black border-gray-100 hover:border-red-600"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <MovieList
          title={`Filmes de ${genres.find((g) => g.id === selectedGenre)?.name}`}
          endpoint={`discover/movie?with_genres=${selectedGenre}`}
        />
      )}
    </div>
  );
}