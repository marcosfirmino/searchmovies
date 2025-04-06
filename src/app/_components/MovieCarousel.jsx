"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function MovieCarousel({ title, movies }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
          1920: { slidesPerView: 10 },
        }}
        className="my-4"
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
                  <span className="font-semibold">{movie.title}</span> <span className="text-gray-400">({new Date(movie.release_date).getFullYear()}) ⭐{movie.vote_average?.toFixed(1)}
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