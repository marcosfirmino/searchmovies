/**
 * Componente Skeleton para MovieCard usando react-loading-skeleton
 * 
 * Mantém as mesmas dimensões do MovieCard real
 */

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieCardSkeleton() {
  return (
    <SkeletonTheme baseColor="rgba(255, 255, 255, 0.05)" highlightColor="rgba(255, 255, 255, 0.1)">
      <div className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
        <Skeleton 
          className="aspect-[2/3] w-full rounded-xl"
        />
      </div>
    </SkeletonTheme>
  );
}