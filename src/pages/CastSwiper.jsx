import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import { MdChevronLeft, MdChevronRight, MdArrowForward, MdError, MdPerson, } from "react-icons/md";
import Image from "../components/media/Image";
import "swiper/css";
import "swiper/css/grid";

const PROFILE_URL = "https://image.tmdb.org/t/p/w500";

const CastSkeleton = () => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="aspect-2/3 rounded-xl bg-gray-800" />
                    <div className="h-4 bg-gray-800 rounded mt-3 w-3/4" />
                    <div className="h-3 bg-gray-800 rounded mt-2 w-1/2" />
                </div>
            ))}
        </div>
    );
};

const CastError = () => {
    return (
        <div className="min-h-50 flex flex-col items-center justify-center text-center">
            <MdError className="text-5xl text-red-500 mb-3" />

            <h3 className="text-lg font-semibold text-white">
                Failed to load cast
            </h3>

            <p className="text-sm text-gray-400 mt-1">
                Something went wrong. Please try again later.
            </p>
        </div>
    );
};

const CastNoData = () => {
    return (
        <div className="min-h-50 flex flex-col items-center justify-center text-center">
            <MdPerson className="text-5xl text-gray-600 mb-3" />

            <h3 className="text-lg font-semibold text-white">
                No cast available
            </h3>

            <p className="text-sm text-gray-400 mt-1">
                There is no cast information available right now.
            </p>
        </div>
    );
};

const CastCard = ({ person }) => {
    return (
        <Link
            to={`/cast/${person.id}`}
            className="block group"
        >
            <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-gray-900">
                {person.profile_path ? (
                    <Image
                        src={`${PROFILE_URL}${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <MdPerson className="text-5xl text-gray-700" />
                    </div>
                )}
            </div>

            <div className="mt-3">
                <h3 className="font-semibold text-white truncate group-hover:text-red-500 transition">
                    {person.name}
                </h3>

                <p className="text-sm text-gray-400 truncate mt-1">
                    {person.character || "Unknown Character"}
                </p>
            </div>
        </Link>
    );
};

const CastSwiper = ({
    title = "Top Cast",
    subtitle = "Meet the cast",
    cast = [],
    viewAllPath,
    loading = false,
    error = false,
}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const castMembers = cast.filter((person) => person?.id);

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
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

                    {!loading &&
                        !error &&
                        castMembers.length > 0 && (
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
                                    aria-label="Previous cast"
                                >
                                    <MdChevronLeft size={22} />
                                </button>

                                <button
                                    ref={nextRef}
                                    type="button"
                                    className="w-9 h-9 rounded-full border border-red-700 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition cursor-pointer disabled:opacity-50"
                                    aria-label="Next cast"
                                >
                                    <MdChevronRight size={22} />
                                </button>
                            </div>
                        )}
                </div>

                {/* Content */}
                {loading ? (
                    <CastSkeleton />
                ) : error ? (
                    <CastError />
                ) : castMembers.length === 0 ? (
                    <CastNoData />
                ) : (
                    <>
                        <Swiper
                            modules={[Navigation, Grid]}
                            spaceBetween={20}
                            slidesPerView={2}
                            grid={{
                                rows: 2,
                                fill: "row",
                            }}
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
                                    spaceBetween: 15,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                480: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                640: {
                                    slidesPerView: 4,
                                    spaceBetween: 18,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                1280: {
                                    slidesPerView: 6,
                                    spaceBetween: 20,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                                1536: {
                                    slidesPerView: 7,
                                    spaceBetween: 20,
                                    grid: {
                                        rows: 2,
                                        fill: "row",
                                    },
                                },
                            }}
                        >
                            {castMembers.map((person) => (
                                <SwiperSlide key={person.id}>
                                    <CastCard person={person} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Mobile View All */}
                        {viewAllPath && (
                            <div className="mt-6 flex justify-center sm:hidden">
                                <Link
                                    to={viewAllPath}
                                    className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition"
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

export default CastSwiper;