/**
 * Sistema de logging centralizado
 * 
 * POR QUÊ ESTE ARQUIVO?
 * - Centraliza todos os logs em um só lugar
 * - Permite controlar logs em produção
 * - Facilita debugging e monitoramento
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Log de erros
 * @param {string} message - Mensagem de erro
 * @param {Error|object} error - Objeto de erro ou dados adicionais
 */
export function logError(message, error = null) {
  if (isDevelopment) {
    console.error(message, error || "");
  }
  // Em produção, aqui poderia enviar para serviço de logging (Sentry, LogRocket, etc.)
}

/**
 * Log de informações
 * @param {string} message - Mensagem informativa
 * @param {any} data - Dados adicionais
 */
export function logInfo(message, data = null) {
  if (isDevelopment) {
    console.log(message, data || "");
  }
}

/**
 * Log de avisos
 * @param {string} message - Mensagem de aviso
 * @param {any} data - Dados adicionais
 */
export function logWarning(message, data = null) {
  if (isDevelopment) {
    console.warn(message, data || "");
  }
}