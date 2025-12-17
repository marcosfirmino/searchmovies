/**
 * Funções utilitárias para formatação de dados
 * 
 * POR QUÊ ESTE ARQUIVO?
 * - Evita repetir código de formatação em vários lugares
 * - Formatação consistente em toda a aplicação
 * - Fácil de manter e testar
 */

/**
 * Formata uma data para retornar apenas o ano
 * @param {string} dateString - Data no formato ISO (ex: "2023-12-25")
 * @returns {string} Ano formatado ou "?" se inválido
 */
export function formatYear(dateString) {
  if (!dateString) return "?";
  try {
    return new Date(dateString).getFullYear().toString();
  } catch {
    return "?";
  }
}

/**
 * Formata uma data completa para formato brasileiro
 * @param {string} dateString - Data no formato ISO (ex: "2023-12-25")
 * @returns {string} Data formatada (ex: "25/12/2023")
 */
export function formatDate(dateString) {
  if (!dateString) return "Data não informada";
  try {
    return new Date(dateString).toLocaleDateString("pt-BR");
  } catch {
    return "Data inválida";
  }
}

/**
 * Formata um valor monetário em dólares para formato brasileiro
 * @param {number} value - Valor em dólares
 * @returns {string} Valor formatado (ex: "US$ 1.000.000,00") ou "Não informado"
 */
export function formatCurrency(value) {
  if (!value || value === 0) return "Não informado";
  try {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "USD",
    });
  } catch {
    return "Valor inválido";
  }
}

/**
 * Formata a duração de um filme em minutos para formato legível
 * @param {number} minutes - Duração em minutos
 * @returns {string} Duração formatada (ex: "2h 30min")
 */
export function formatRuntime(minutes) {
  if (!minutes || minutes === 0) return "Não informado";
  try {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}min`;
    }
    
    if (mins === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${mins}min`;
  } catch {
    return "Duração inválida";
  }
}

/**
 * Formata a classificação indicativa do filme
 * @param {string} certification - Classificação (ex: "L", "10", "12", "14", "16", "18")
 * @returns {string} Classificação formatada (ex: "Livre", "10+", "Não informada")
 */
export function formatCertification(certification) {
  if (!certification || certification === "N/A") {
    return "Não informada";
  }
  
  if (certification === "L") {
    return "Livre";
  }
  
  return `${certification}+`;
}

/**
 * Formata a nota de avaliação do filme
 * @param {number} rating - Nota (ex: 8.5)
 * @param {number} decimals - Número de casas decimais (padrão: 1)
 * @returns {string} Nota formatada (ex: "8.5") ou "?" se inválido
 */
export function formatRating(rating, decimals = 1) {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return "?";
  }
  try {
    return rating.toFixed(decimals);
  } catch {
    return "?";
  }
}

/**
 * Formata uma lista de gêneros em uma string separada por vírgulas
 * @param {Array} genres - Array de objetos com propriedade 'name'
 * @returns {string} Gêneros formatados (ex: "Ação, Aventura, Drama")
 */
export function formatGenres(genres) {
  if (!genres || !Array.isArray(genres) || genres.length === 0) {
    return "Não informado";
  }
  return genres.map((g) => g.name).join(", ");
}