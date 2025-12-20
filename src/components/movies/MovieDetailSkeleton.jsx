/**
 * Componente Skeleton para página de detalhes do filme usando react-loading-skeleton
 * 
 * Simula a estrutura completa da página de detalhes
 */

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="rgba(255, 255, 255, 0.05)" highlightColor="rgba(255, 255, 255, 0.1)">
      <div className="min-h-screen bg-[#020617] overflow-x-hidden">
        {/* Hero Section Skeleton */}
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[80vh] bg-gray-800">
          <Skeleton className="w-full h-full" />
          
          {/* Content overlay skeleton */}
          <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-7 md:pb-8 lg:pb-10 xl:pb-12 2xl:pb-14 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 2xl:pt-40 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-start">
            {/* Poster skeleton */}
            <div className="hidden md:block">
              <Skeleton className="w-36 lg:w-44 xl:w-52 2xl:w-72 aspect-[2/3] rounded-lg" />
            </div>
            
            {/* Info skeleton */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Skeleton height={24} width={80} borderRadius={4} />
                <Skeleton height={24} width={64} borderRadius={4} />
                <Skeleton height={24} width={96} borderRadius={4} />
              </div>
              <Skeleton height={32} width="75%" borderRadius={4} />
              <Skeleton height={16} width="100%" maxWidth="32rem" borderRadius={4} />
              <Skeleton height={16} width="85%" maxWidth="28rem" borderRadius={4} />
              <div className="flex gap-3 pt-4">
                <Skeleton height={40} width={128} borderRadius={6} />
                <Skeleton height={40} width={96} borderRadius={6} />
              </div>
            </div>
          </div>
        </div>

        {/* Content sections skeleton */}
        <div className="relative z-10 pt-[60px] px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16 2xl:pb-24 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-16">
          {/* Tech info skeleton */}
          <div className="border-t border-white/10 pt-6 md:pt-8 2xl:pt-10">
            <Skeleton height={24} width={192} borderRadius={4} className="mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 2xl:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton circle width={20} height={20} className="flex-shrink-0 mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton height={12} width={80} borderRadius={4} />
                    <Skeleton height={16} width={96} borderRadius={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cast skeleton */}
          <div className="border-t border-white/10 pt-6 md:pt-8 2xl:pt-10">
            <Skeleton height={24} width={128} borderRadius={4} className="mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 text-center">
                  <Skeleton className="w-[170px] aspect-[2/3] rounded-lg mb-3" />
                  <Skeleton height={16} width={96} borderRadius={4} className="mx-auto mb-1" />
                  <Skeleton height={12} width={80} borderRadius={4} className="mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations skeleton */}
          <div className="border-t border-white/10 pt-6 md:pt-8 2xl:pt-10">
            <Skeleton height={24} width={192} borderRadius={4} className="mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-[160px] sm:w-[180px] md:w-[200px] aspect-[2/3] rounded-xl flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}