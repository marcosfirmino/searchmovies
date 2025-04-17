"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function MovieCarousel({ title, movies }) {
  return (
    <div className="">
      <h2 className=" mb-2 mt-10 text-xl font-bold">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        breakpoints={{
          320: { slidesPerView: 3 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
          1920: { slidesPerView: 10 },
        }}
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} className="block">
              <div className="overflow-hidden mb-5">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-md border border-transparent hover:border-4 hover:border-red-600 transition duration-150"
                />
                <p className="mt-2 text-center text-sm">
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