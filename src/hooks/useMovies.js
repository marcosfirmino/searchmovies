import { useState, useEffect } from "react";
import { getMoviesByEndpoint } from "@/services/tmdb";
import { logError } from "@/utils/logger";

/**
 * Hook customizado para buscar filmes por endpoint
 * 
 * O QUE FAZ?
 * - Gerencia estados de loading, error e dados
 * - Faz a busca automaticamente quando o endpoint muda
 * - Retorna tudo pronto para usar no componente
 * 
 * @param {string} endpoint - Endpoint da API (ex: "movie/popular", "movie/top_rated")
 * @returns {object} { movies, loading, error }
 */
export function useMovies(endpoint) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se não tem endpoint, não faz nada
    if (!endpoint) {
      setMovies([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usa o serviço centralizado
        const moviesData = await getMoviesByEndpoint(endpoint);
        setMovies(moviesData);
      } catch (err) {
        setError(err.message || "Falha ao carregar os filmes. Tente novamente mais tarde.");
        logError("Erro ao buscar filmes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  return { movies, loading, error };
}