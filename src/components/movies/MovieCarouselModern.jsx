"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieCard from "@/components/ui/MovieCard";
import SectionTitle from "@/components/ui/SectionTitle";
import "swiper/css";
import "swiper/css/navigation";

/**
 * Carrossel moderno de filmes (versão melhorada)
 * 
 * CARACTERÍSTICAS:
 * - Scroll horizontal suave com Swiper
 * - Botões de navegação
 * - Design moderno
 * - Integrado com MovieCard
 */
export default function MovieCarouselModern({ title, movies, onMovieClick, noPadding = false }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      swiperRef.current.updateSlides();
      swiperRef.current.updateSlidesClasses();
    }
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className={`mb-6 sm:mb-8 md:mb-10 lg:mb-12 ${noPadding ? '' : 'px-4 sm:px-6 md:px-8'} animate-fade-in-up`}>
      <SectionTitle>{title}</SectionTitle>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            swiper.update();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
          }, 100);
        }}
        onSlideChange={(swiper) => {
          swiper.update();
        }}
        onResize={(swiper) => {
          swiper.update();
        }}
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation
        watchOverflow={true}
        watchSlidesProgress={true}
        loop={false}
        className="!pt-4 !pb-8"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            style={{ width: "160px", flexShrink: 0, padding: "12px 8px" }}
            className="sm:!w-[180px] md:!w-[200px] sm:!p-[14px_10px] md:!p-[16px_12px]"
          >
            <MovieCard movie={movie} onClick={onMovieClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}