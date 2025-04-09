"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RecommendedCarousel({ title, movies }) {
  return (
    <div className="">
      <h2 className=" mb-2 mt-10 text-xl font-bold">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        breakpoints={{
            320: { slidesPerView: 2 },   // muito pequeno
            480: { slidesPerView: 3 },   // celular em pé
            640: { slidesPerView: 4 },   // celular deitado / tablet
            768: { slidesPerView: 5 },   // tablet / telas médias
            1024: { slidesPerView: 6 },  // desktop e acima
            1280: { slidesPerView: 6 },  // evita passar de 6
  }}
>

        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} className="block">
              <div className="overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-md"
                />
                <p className="p-2 text-center text-sm">
                  <span className="font-semibold block truncate">{movie.title}</span> <span className="text-gray-400">({new Date(movie.release_date).getFullYear()}) ⭐{movie.vote_average?.toFixed(1)}
                  </span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}