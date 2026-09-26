import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdPlayArrow,
  MdSchedule,
  MdFavorite,
  MdError,
  MdStar,
} from "react-icons/md";
import {
  useGenres,
  useMovieDetails,
  useMovieVideos,
} from "../hooks/useMovies";
import {
  useTvDetails,
  useTvVideos,
} from "../hooks/useTv";
import Image from "./media/Image";
import Button from "./Button";
import { formatRuntime } from "../utils/FormateTime";
import useFavoriteStore from "../store/favoriteStore";
import "swiper/css";
import "swiper/css/effect-fade";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const THUMBNAIL_URL = "https://image.tmdb.org/t/p/w500";

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-162.5 overflow-hidden bg-gray-900 animate-pulse md:min-h-175">
      <div className="absolute inset-0 bg-gray-800" />

      <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-28 pb-40 md:min-h-175 md:pb-28">
        <div className="w-full max-w-2xl">
          <div className="mb-5 h-7 w-28 rounded-full bg-gray-700" />

          <div className="mb-5 h-12 w-3/4 rounded-lg bg-gray-700 md:h-16" />

          <div className="mb-5 flex items-center gap-4">
            <div className="h-5 w-14 rounded bg-gray-700" />
            <div className="h-5 w-14 rounded bg-gray-700" />
            <div className="h-5 w-20 rounded bg-gray-700" />
          </div>

          <div className="mb-7 space-y-3">
            <div className="h-4 w-full rounded bg-gray-700" />
            <div className="h-4 w-11/12 rounded bg-gray-700" />
            <div className="h-4 w-3/4 rounded bg-gray-700" />
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-32 rounded-lg bg-gray-700" />
            <div className="h-12 w-40 rounded-lg bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 w-full px-4 md:bottom-20 md:px-6 lg:left-auto lg:right-6 lg:w-200 lg:px-0">
        <div className="flex justify-center gap-2 md:gap-3 lg:justify-start">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-video w-[calc(40%-6px)] rounded-lg bg-gray-700 md:w-48 md:rounded-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroError = ({ type }) => {
  const contentType =
    type === "movie" ? "movies" : "series";

  return (
    <section className="flex min-h-162.5 items-center justify-center bg-black px-6 text-white md:min-h-175">
      <div className="flex flex-col items-center text-center">
        <MdError className="mb-4 text-5xl text-red-600" />

        <h2 className="mb-2 text-xl font-semibold md:text-2xl">
          Failed to load {contentType}
        </h2>

        <p className="text-sm text-gray-400">
          Something went wrong. Please try again later.
        </p>
      </div>
    </section>
  );
};

const HeroNoData = ({ type }) => {
  const contentType =
    type === "movie" ? "movies" : "series";

  return (
    <section className="flex min-h-162.5 items-center justify-center bg-black px-6 text-white md:min-h-175">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold md:text-2xl">
          No {contentType} available
        </h2>

        <p className="text-sm text-gray-400">
          There are no {contentType} to display.
        </p>
      </div>
    </section>
  );
};

const HeroCarousel = ({
  movies = [],
  type = "movie",
  badge = "Now Playing",
  detailsPath = "/movies",
  loading = false,
  error = false,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const { data: genreData } = useGenres();

  const { data: movieDetails } = useMovieDetails(
    type === "movie" ? activeId : null
  );

  const { data: tvDetails } = useTvDetails(
    type !== "movie" ? activeId : null
  );

  const { data: movieVideos } = useMovieVideos(
    type === "movie" ? activeId : null
  );

  const { data: tvVideos } = useTvVideos(
    type !== "movie" ? activeId : null
  );

  const { addFavorite } = useFavoriteStore();

  const genres = genreData?.genres || [];

  const items = movies.filter(
    (item) => item.backdrop_path
  );

  const activeDetails =
    type === "movie" ? movieDetails : tvDetails;

  const videoResults =
    type === "movie"
      ? movieVideos?.results || []
      : tvVideos?.results || [];

  const trailer =
    videoResults.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official
    ) ||
    videoResults.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    videoResults.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    );

  const getTrailerPath = (id) => {
    if (type === "movie") {
      return `/movies/${id}/trailer`;
    }

    if (type === "series") {
      return `/series/${id}/trailer`;
    }

    return `/tv-shows/${id}/trailer`;
  };

  useEffect(() => {
    if (items.length && !activeId) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  useEffect(() => {
    if (!thumbsSwiper || thumbsSwiper.destroyed || !activeId) {
      return;
    }

    const activeIndex = items.findIndex(
      (item) => item.id === activeId
    );

    if (activeIndex !== -1) {
      thumbsSwiper.slideTo(activeIndex, 500);
    }
  }, [activeId, thumbsSwiper, items]);

  if (loading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return <HeroError type={type} />;
  }

  if (!items.length) {
    return <HeroNoData type={type} />;
  }

  return (
    <section className="relative overflow-hidden bg-black lg:min-h-full">
      {/* Main Hero Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Thumbs]}
        initialSlide={0}
        effect="fade"
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          const item = items[swiper.activeIndex];

          if (item) {
            setActiveId(item.id);
          }
        }}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="hero-main-swiper"
      >
        {items.map((item) => {
          const title = item.title || item.name;

          const releaseDate =
            item.release_date || item.first_air_date;

          const isActive = item.id === activeId;

          return (
            <SwiperSlide key={item.id}>
              <div className="relative min-h-162.5 overflow-hidden md:min-h-175">
                <Image
                  src={`${IMAGE_URL}${item.backdrop_path}`}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20" />

                <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-28 pb-40 md:min-h-175 md:pb-28">
                  <div className="max-w-2xl text-white">
                    <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
                      {badge}
                    </span>

                    <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                      {title}
                    </h1>

                    <div className="mb-5 flex flex-wrap items-center gap-4 text-sm md:text-base">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <MdStar />
                        {item.vote_average?.toFixed(1)}
                      </span>

                      <span>
                        {releaseDate?.slice(0, 4) || "N/A"}
                      </span>

                      {isActive &&
                        activeDetails?.runtime && (
                          <span className="flex items-center gap-1">
                            <MdSchedule
                              className="text-red-500"
                              size={17}
                            />
                            {formatRuntime(
                              activeDetails.runtime
                            )}
                          </span>
                        )}

                      {item.genre_ids?.map((genreId) => {
                        const genre = genres.find(
                          (genre) =>
                            genre.id === genreId
                        );

                        return genre ? (
                          <span key={genre.id}>
                            {genre.name}
                          </span>
                        ) : null;
                      })}
                    </div>

                    <p className="mb-7 line-clamp-3 text-sm leading-7 text-gray-300 md:text-base">
                      {item.overview ||
                        "No overview available."}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Watch Trailer */}
                      {isActive && trailer && (
                        <Link
                          to={getTrailerPath(item.id)}
                        >
                          <Button
                            type="button"
                            variant="danger"
                            className="inline-flex items-center gap-2 py-3"
                            leftIcon={MdPlayArrow}
                          >
                            Watch Trailer
                          </Button>
                        </Link>
                      )}

                      {/* View Details */}
                      <Link
                        to={`${detailsPath}/${item.id}`}
                      >
                        <Button
                          type="button"
                          className="inline-flex items-center gap-2 bg-white py-3 text-black hover:bg-gray-200"
                        >
                          View Details
                        </Button>
                      </Link>

                      {/* Favorite */}
                      <Button
                        type="button"
                        variant="danger"
                        className="inline-flex items-center gap-2 py-3"
                        leftIcon={MdFavorite}
                        onClick={() => addFavorite(item)}
                      >
                        Add to Favorite
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-0 right-0 z-30 mx-auto w-full max-w-7xl px-6 md:bottom-20">
        <div className="ml-auto w-full lg:w-[62%]">
          <Swiper
            modules={[Thumbs]}
            initialSlide={0}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={2}
            watchSlidesProgress
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 2,
              },
              540: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 5,
              },
              1536: {
                slidesPerView: 5,
              },
            }}
            className="hero-thumbs-swiper"
          >
            {items.map((item) => {
              const title = item.title || item.name;
              const isActive = item.id === activeId;

              return (
                <SwiperSlide key={item.id}>
                  <div
                    className={`group relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 md:rounded-xl ${isActive
                        ? "border-red-600"
                        : "border-transparent"
                      }`}
                  >
                    <Image
                      src={`${THUMBNAIL_URL}${item.backdrop_path}`}
                      alt={`${title} thumbnail`}
                      className={`h-full w-full object-cover transition duration-300 ${isActive
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-100"
                        }`}
                    />

                    <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-transparent" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;