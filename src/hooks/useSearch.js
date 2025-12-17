import { useState, useEffect } from "react";
import { searchMovies } from "@/services/tmdb";
import { logError } from "@/utils/logger";

/**
 * Hook customizado para busca de filmes com debounce
 * 
 * O QUE FAZ?
 * - Gerencia estados de loading, error e dados
 * - Faz busca automática quando a query muda
 * - Tem debounce de 600ms (evita muitas requisições enquanto digita)
 * - Limpa resultados quando a query está vazia
 * 
 * @param {string} query - Termo de busca
 * @returns {object} { movies, loading, error }
 */
export function useSearch(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se a query está vazia, limpa os resultados
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Usa o serviço centralizado
        const moviesData = await searchMovies(query);
        setMovies(moviesData);
      } catch (err) {
        setError(err.message || "Erro ao buscar filmes. Tente novamente.");
        logError("Erro ao buscar filmes:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: espera 600ms antes de buscar (evita muitas requisições)
    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 600);

    // Limpa o timeout se a query mudar antes dos 600ms
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { movies, loading, error };
}