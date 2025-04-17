"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ActorCarousel({ title, cast }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 mt-10">{title}</h2>

      <Swiper
        modules={[Navigation]}
        slidesPerView={Math.min(cast.length, 6)}
        navigation={cast.length > 6}
        spaceBetween={12}
        breakpoints={{
          320: { slidesPerView: 3 }, 
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          // 1920: { slidesPerView: 8 },
        }}

      >
        {cast.map((actor) => (
          <SwiperSlide key={actor.id}>
            <div className="text-center text-sm">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/placeholder.png"
                }
                alt={actor.name}
                className="w-full aspect-[2/3] object-cover rounded-md"
              />
              <p className="text-base pt-2 font-semibold">{actor.name}</p>
              <p className="text-gray-400 text-sm">({actor.character})</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}