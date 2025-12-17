import { useState, useEffect } from "react";
import { getGenres } from "@/services/tmdb";
import { logError } from "@/utils/logger";

/**
 * Hook customizado para buscar lista de gêneros
 * 
 * O QUE FAZ?
 * - Gerencia estados de loading, error e dados
 * - Busca a lista de gêneros automaticamente
 * - Retorna tudo pronto para usar no componente
 * 
 * @returns {object} { genres, loading, error }
 */
export function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usa o serviço centralizado
        const allGenres = await getGenres();
        setGenres(allGenres);
      } catch (err) {
        setError(err.message || "Erro ao carregar gêneros.");
        logError("Erro ao carregar gêneros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []); // Executa apenas uma vez quando o componente monta

  return { genres, loading, error };
}