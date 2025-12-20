/**
 * Componente Skeleton para Carrossel de Filmes usando react-loading-skeleton
 * 
 * Mostra múltiplos MovieCardSkeleton em um layout de carrossel
 */

import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import SectionTitle from "@/components/ui/SectionTitle";

export default function MovieCarouselSkeleton({ title = "Carregando..." }) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4 sm:px-6 md:px-8">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex gap-4 sm:gap-6 overflow-hidden pt-4 pb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}