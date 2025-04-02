"use client";
import Link from "next/link";
import { useParams } from "next/navigation"; // Novo import
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams(); // Usando o hook correto do App Router
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=db7c529102dd5bbe0c3f5d7c307af628&language=pt-BR`)
        .then((response) => setMovie(response.data))
        .catch((error) => console.error("Erro ao buscar os dados do filme:", error));
    }
  }, [id]);

  if (!movie) return <p className="flex items-center justify-center h-screen text-3xl font-bold">Carregando...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-center"><span className="text-3xl font-bold">{movie.title}</span> ({movie.release_date.split("-")[0]}) ⭐{movie.vote_average.toFixed(1)}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        className="w-80 h-auto rounded-lg mt-4 block mx-auto "
        alt={movie.title}
      />
      <p className="mt-4 text-white-800">{movie.overview}</p>
      

      <div className="mt-4">
        <Link href={`/watch/${id}`}>
          <button className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Assistir
          </button>
        </Link>
      </div>
    </div>
  );
}
