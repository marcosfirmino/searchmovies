/**
 * Componente de Carrossel de Elenco
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getImageUrl } from "@/services/tmdb";
import SectionTitle from "@/components/ui/SectionTitle";
import "swiper/css";
import "swiper/css/navigation";

export default function CastCarousel({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-8">
      <SectionTitle>Elenco</SectionTitle>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation={cast.length > 6}
        watchOverflow={true}
        watchSlidesProgress={true}
        loop={false}
        className="!pt-2 !pb-2 !pr-0"
      >
        {cast.map((actor) => (
          <SwiperSlide key={actor.id} style={{ width: '170px', flexShrink: 0 }}>
            <div className="text-center group cursor-pointer">
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-gray-800 border border-white/10 group-hover:border-red-600/50 transition-all group-hover:scale-105">
                {actor.profile_path ? (
                  <img
                    src={getImageUrl(actor.profile_path, "w185")}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm leading-tight">{actor.name}</h3>
              <p className="text-gray-400 text-xs mt-1">{actor.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}