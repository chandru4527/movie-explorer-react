import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdChevronLeft, MdChevronRight, MdArrowForward, MdError, MdMovie, } from "react-icons/md";
import MovieCard from "../pages/movies/MovieCard";
import "swiper/css";

const MovieSkeleton = () => {
    return (
        <div className="overflow-hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                    1536: { slidesPerView: 7 },
                }}
            >
                {[...Array(7)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="animate-pulse">
                            {/* Poster skeleton */}
                            <div className="aspect-2/3 w-full rounded-xl bg-gray-800" />

                            {/* Movie title skeleton */}
                            <div className="mt-3 h-4 w-3/4 rounded bg-gray-800" />

                            {/* Rating / release date skeleton */}
                            <div className="mt-2 h-3 w-1/2 rounded bg-gray-800" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const MovieError = ({ type = "movie" }) => {
    const label = type === "tv" ? "series" : "movies";

    return (
        <div className="min-h-50 flex flex-col items-center justify-center text-center">
            <MdError className="text-5xl text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-white">
                Failed to load {label}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
                Something went wrong. Please try again later.
            </p>
        </div>
    );
};

const MovieNoData = ({ type = "movie" }) => {
    const label = type === "tv" ? "series" : "movies";

    return (
        <div className="min-h-50 flex flex-col items-center justify-center text-center">
            <MdMovie className="text-5xl text-gray-600 mb-3" />
            <h3 className="text-lg font-semibold text-white">
                No {label} available
            </h3>
            <p className="text-sm text-gray-400 mt-1">
                There are no {label} to display right now.
            </p>
        </div>
    );
};

const MovieSwiper = ({
    title,
    subtitle,
    movies = [],
    viewAllPath,
    loading = false,
    error = false,
    type = "movie",
}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {title}
                        </h2>

                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-400">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {!loading && !error && movies.length > 0 && (
                        <div className="flex items-center gap-3">
                            {viewAllPath && (
                                <Link
                                    to={viewAllPath}
                                    className="hidden sm:flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                                >
                                    View All
                                    <MdArrowForward size={18} />
                                </Link>
                            )}

                            <button
                                ref={prevRef}
                                type="button"
                                className="w-9 h-9 rounded-full border border-red-700 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition cursor-pointer disabled:opacity-50"
                            >
                                <MdChevronLeft size={22} />
                            </button>

                            <button
                                ref={nextRef}
                                type="button"
                                className="w-9 h-9 rounded-full border border-red-700 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition cursor-pointer disabled:opacity-50"
                            >
                                <MdChevronRight size={22} />
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <MovieSkeleton />
                ) : error ? (
                    <MovieError type={type} />
                ) : movies.length === 0 ? (
                    <MovieNoData type={type} />
                ) : (
                    <>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={2}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl =
                                    prevRef.current;
                                swiper.params.navigation.nextEl =
                                    nextRef.current;
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                },
                                480: {
                                    slidesPerView: 3,
                                },
                                540: {
                                    slidesPerView: 3,
                                },
                                640: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 5,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                                1280: {
                                    slidesPerView: 6,
                                },
                                1536: {
                                    slidesPerView: 7,
                                },
                            }}
                        >
                            {movies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard
                                        movie={movie}
                                        type={type}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {viewAllPath && (
                            <div className="mt-6 flex justify-center sm:hidden">
                                <Link
                                    to={viewAllPath}
                                    className="flex items-center gap-1 text-sm text-gray-300 hover:text-red-500 transition"
                                >
                                    View All
                                    <MdArrowForward size={18} />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default MovieSwiper;