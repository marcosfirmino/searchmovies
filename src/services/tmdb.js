import axios from "axios";
import { logError } from "@/utils/logger";

/**
 * Serviço centralizado para comunicação com a API do TMDB
 * 
 * POR QUÊ ESTE ARQUIVO?
 * - Evita repetir a URL e chave da API em vários lugares
 * - Facilita manutenção (mudar em um só lugar)
 * - Tratamento de erros centralizado
 * - Código mais limpo e reutilizável
 */

// URL base da API do TMDB
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3";

// Pegamos a chave da API das variáveis de ambiente
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/**
 * Configuração do axios para todas as requisições
 * Adiciona automaticamente a chave da API e a URL base
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR", // Sempre retorna dados em português
  },
});

/**
 * Função auxiliar para construir URLs de imagens
 * @param {string} path - Caminho da imagem retornado pela API
 * @param {string} size - Tamanho da imagem (w300, w500, original, etc.)
 * @returns {string} URL completa da imagem
 */
export const getImageUrl = (path, size = "w300") => {
  if (!path) return "/placeholder.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

/**
 * Busca filmes por nome/título
 * @param {string} query - Termo de busca
 * @returns {Promise} Lista de filmes encontrados
 */
export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query },
    });
    return response.data.results || [];
  } catch (error) {
    logError("Erro ao buscar filmes:", error);
    throw new Error("Erro ao buscar filmes. Tente novamente.");
  }
};

/**
 * Busca filmes por endpoint (popular, top_rated, now_playing, etc.)
 * @param {string} endpoint - Endpoint da API (ex: "movie/popular", "movie/top_rated")
 * @returns {Promise} Lista de filmes
 */
export const getMoviesByEndpoint = async (endpoint) => {
  try {
    // Remove a barra inicial se existir
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const response = await api.get(`/${cleanEndpoint}`);
    return response.data.results || [];
  } catch (error) {
    logError("Erro ao buscar filmes:", error);
    throw new Error("Falha ao carregar os filmes. Tente novamente mais tarde.");
  }
};

/**
 * Busca detalhes completos de um filme
 * @param {number} movieId - ID do filme
 * @returns {Promise} Dados completos do filme
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    logError("Erro ao buscar detalhes do filme:", error);
    throw new Error("Erro ao carregar detalhes do filme.");
  }
};

/**
 * Busca vídeos (trailers) de um filme
 * @param {number} movieId - ID do filme
 * @returns {Promise} Chave do vídeo do YouTube (se encontrar trailer)
 */
export const getMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    const videos = response.data.results || [];
    
    // Procura por trailer do YouTube
    const trailer = videos.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    
    return trailer ? trailer.key : null;
  } catch (error) {
    logError("Erro ao buscar vídeos do filme:", error);
    return null;
  }
};

/**
 * Busca elenco e equipe técnica de um filme
 * @param {number} movieId - ID do filme
 * @returns {Promise} Objeto com cast (elenco) e crew (equipe)
 */
export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return {
      cast: response.data.cast || [],
      crew: response.data.crew || [],
    };
  } catch (error) {
    logError("Erro ao buscar créditos do filme:", error);
    throw new Error("Erro ao carregar elenco do filme.");
  }
};

/**
 * Busca classificação indicativa (certificação) do filme no Brasil
 * @param {number} movieId - ID do filme
 * @returns {Promise} Classificação (ex: "L", "10", "12", "14", "16", "18")
 */
export const getMovieCertification = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/release_dates`);
    const results = response.data.results || [];
    
    // Procura dados do Brasil
    const brData = results.find((item) => item.iso_3166_1 === "BR");
    const certification = brData?.release_dates[0]?.certification;
    
    return certification || "N/A";
  } catch (error) {
    logError("Erro ao buscar classificação:", error);
    return "N/A";
  }
};

/**
 * Busca filmes recomendados baseados em um filme
 * @param {number} movieId - ID do filme
 * @returns {Promise} Lista de filmes recomendados
 */
export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    const movies = response.data.results || [];
    
    // Filtra apenas filmes que têm poster
    return movies.filter((movie) => movie.poster_path);
  } catch (error) {
    logError("Erro ao buscar recomendações:", error);
    return [];
  }
};

/**
 * Busca plataformas de streaming onde o filme está disponível
 * @param {number} movieId - ID do filme
 * @returns {Promise} Objeto com plataformas disponíveis no Brasil (flatrate, buy, rent)
 */
export const getWatchProviders = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/watch/providers`);
    const brProviders = response.data.results?.BR || {};
    return {
      flatrate: brProviders.flatrate || [],
      buy: brProviders.buy || [],
      rent: brProviders.rent || [],
    };
  } catch (error) {
    logError("Erro ao buscar plataformas:", error);
    return {
      flatrate: [],
      buy: [],
      rent: [],
    };
  }
};

/**
 * Busca lista de gêneros de filmes
 * @returns {Promise} Lista de gêneros
 */
export const getGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres || [];
  } catch (error) {
    logError("Erro ao buscar gêneros:", error);
    throw new Error("Erro ao carregar gêneros.");
  }
};