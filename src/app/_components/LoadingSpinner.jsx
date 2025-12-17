"use client";

/**
 * Componente LoadingSpinner melhorado
 * 
 * MELHORIAS:
 * - Visual mais moderno
 * - Cores consistentes com o tema
 * - Tamanhos variáveis
 */
export default function LoadingSpinner({ 
  size = "md", // sm, md, lg, large
  className = "" 
}) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
    large: "h-24 w-24 border-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-10 ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizes[size]} border-t-red-600 border-r-transparent border-b-transparent border-l-transparent`}
        role="status"
        aria-label="Carregando"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}