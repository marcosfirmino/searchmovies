/**
 * Componente de Carrossel de Elenco
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getImageUrl } from "@/services/tmdb";
import SectionTitle from "@/components/ui/SectionTitle";
import { User } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function CastCarousel({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-6 md:pt-8 2xl:pt-10">
      <SectionTitle>Elenco</SectionTitle>
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation={cast.length > 6}
        watchOverflow={true}
        watchSlidesProgress={true}
        loop={false}
        className="!pt-4 !pb-8 2xl:!pt-6 2xl:!pb-10"
      >
        {cast.map((actor) => (
          <SwiperSlide key={actor.id} style={{ width: "clamp(170px, 12vw, 230px)", flexShrink: 0 }}>
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
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm 2xl:text-base leading-tight">{actor.name}</h3>
              <p className="text-gray-400 text-xs 2xl:text-sm mt-1">{actor.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}