/**
 * Componente Button reutilizável
 * 
 * POR QUÊ ESTE COMPONENTE?
 * - Padroniza todos os botões da aplicação
 * - Facilita manutenção (mudar estilo em um só lugar)
 * - Suporta diferentes variantes e tamanhos
 */

export default function Button({
  children,
  variant = "primary", // primary, secondary, outline
  size = "md", // sm, md, lg
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  // Estilos base
  const baseStyles = "font-bold inline-flex items-center justify-center gap-2 rounded-md transition duration-200 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variantes de estilo
  const variants = {
    primary: "bg-red-600 text-white border border-white/20 hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-gray-600 text-white border border-gray-500 hover:bg-gray-700 focus:ring-gray-500",
    outline: "bg-transparent text-white border-2 border-white/40 hover:bg-white/10 focus:ring-white/30",
  };

  // Tamanhos
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

