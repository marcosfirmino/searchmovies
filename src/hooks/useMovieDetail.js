import { useState, useEffect } from "react";
import {
  getMovieDetails,
  getMovieTrailer,
  getMovieCredits,
  getMovieCertification,
  getMovieRecommendations,
  getWatchProviders,
} from "@/services/tmdb";
import { logError } from "@/utils/logger";

/**
 * Hook customizado para buscar todos os dados de um filme
 * 
 * O QUE FAZ?
 * - Busca detalhes completos do filme
 * - Busca trailer, elenco, classificação, recomendações e plataformas
 * - Processa os dados (encontra diretor, limita elenco, etc.)
 * - Retorna tudo organizado e pronto para usar
 * 
 * @param {string} movieId - ID do filme
 * @returns {object} { movie, videoKey, cast, director, certification, recommendedMovies, watchProviders, loading, error }
 */
export function useMovieDetail(movieId) {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [certification, setCertification] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState({
    flatrate: [],
    buy: [],
    rent: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca todas as informações em paralelo (mais rápido!)
        const [
          movieData,
          trailerKey,
          credits,
          cert,
          recommendations,
          providers,
        ] = await Promise.all([
          getMovieDetails(movieId),
          getMovieTrailer(movieId),
          getMovieCredits(movieId),
          getMovieCertification(movieId),
          getMovieRecommendations(movieId),
          getWatchProviders(movieId),
        ]);

        // Define os dados do filme
        setMovie(movieData);
        setVideoKey(trailerKey);

        // Processa elenco e diretor
        setCast(credits.cast.slice(0, 12)); // Limita a 12 atores
        const foundDirector = credits.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(foundDirector?.name || "Não informado");

        // Define os outros dados
        setCertification(cert);
        setRecommendedMovies(recommendations);
        setWatchProviders(providers);
      } catch (err) {
        setError(err.message || "Erro ao carregar detalhes do filme.");
        logError("Erro ao buscar dados do filme:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return {
    movie,
    videoKey,
    cast,
    director,
    certification,
    recommendedMovies,
    watchProviders,
    loading,
    error,
  };
}