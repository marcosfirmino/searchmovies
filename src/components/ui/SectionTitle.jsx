/**
 * Componente de Título de Seção padronizado
 * 
 * POR QUÊ ESTE COMPONENTE?
 * - Padroniza títulos em toda aplicação
 * - Mantém consistência visual
 * - Facilita manutenção
 */

export default function SectionTitle({ children, icon = null, variant = "default" }) {
  const variants = {
    default: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-6 flex items-center gap-2 sm:gap-2 md:gap-3",
    gradient: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-6 flex items-center gap-2 sm:gap-2 md:gap-3",
  };

  const barVariants = {
    default: "w-1 h-6 bg-red-600 rounded-full",
    gradient: "w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full",
  };

  const textVariants = {
    default: "text-white",
    gradient: "bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent",
  };

  return (
    <h2 className={variants[variant]}>
      <span className={barVariants[variant]}></span>
      {icon && <span>{icon}</span>}
      <span className={textVariants[variant]}>{children}</span>
    </h2>
  );
}