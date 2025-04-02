"use client"; // Define que o componente será cliente
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WatchMovie() {
  const { id } = useParams(); // Pega o ID dinamicamente
  const [movie, setMovie] = useState(null);
  const embedUrl = `https://vidsrc.to/embed/movie/${id}`;

  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=db7c529102dd5bbe0c3f5d7c307af628&language=pt-BR`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error("Erro ao buscar os dados do filme:", err));
    }
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <div className="w-full max-w-4xl">
        <iframe
          src={embedUrl}
          className="w-full h-[500px] border-none rounded-lg"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
