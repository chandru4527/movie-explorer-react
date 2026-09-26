import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdCalendarToday, MdFavorite, MdLanguage, MdPlayArrow, MdStar, MdPublic, } from "react-icons/md";
import { useTvCredits, useTvDetails } from "../../hooks/useTv";
import Image from "../../components/media/Image";
import Button from "../../components/Button";
import useFavoriteStore from "../../store/favoriteStore";
import CastSwiper from "../CastSwiper";

import Loader from '../../components/Loader'

const SeriesDetails = () => {
  const { id } = useParams();

  const {
    data: series,
    isLoading,
    isError,
  } = useTvDetails(id);

  const {
    data: creditsData,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useTvCredits(id);

  const { addFavorite } = useFavoriteStore();

  if (isLoading) {
    return (
      <section className="min-h-screen bg-black px-6 pb-16 pt-32 text-white flex items-center justify-center">
        <Loader size="lg" text={'Loading Series.....'} color="red" className="text-2xl font-bold" />
      </section>
    );
  }

  if (isError || !series) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black px-6 pt-20 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Series not found
          </h2>

          <Link
            to="/series"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium transition hover:bg-red-700"
          >
            <MdArrowBack size={20} />
            Back to Series
          </Link>
        </div>
      </section>
    );
  }

  const backdropUrl = series.backdrop_path
    ? `https://image.tmdb.org/t/p/original${series.backdrop_path}`
    : null;

  const posterUrl = series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : null;

  const genres = series.genres || [];

  return (
    <section className="min-h-screen text-white">
      {/* Hero */}
      <div className="relative mb-30">
        {backdropUrl && (
          <div className="absolute inset-0 h-162.5 overflow-hidden">
            <img
              src={backdropUrl}
              alt={series.name}
              className="h-full w-full object-cover opacity-30"
            />

            {/* <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/70 to-black" /> */}
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-6 pt-10">
          {/* Back */}
          <Link
            to="/series"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-red-600"
          >
            <MdArrowBack size={20} />
            Back to Series
          </Link>

          <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
            {/* Poster */}
            <div className="mx-auto w-full max-w-75">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={series.name}
                  className="w-full rounded-2xl object-cover shadow-2xl shadow-black/60"
                />
              ) : (
                <div className="flex aspect-2/3 items-center justify-center rounded-2xl bg-gray-900 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              {/* Genres */}
              <div className="mb-4 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-gray-700 bg-white/5 px-3 py-1 text-xs text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                {series.name}
              </h1>

              {series.original_name &&
                series.original_name !== series.name && (
                  <p className="mt-2 text-gray-400">
                    {series.original_name}
                  </p>
                )}

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <MdStar
                    className="text-yellow-400"
                    size={20}
                  />
                  {series.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span className="flex items-center gap-1.5">
                  <MdCalendarToday size={18} />
                  {series.first_air_date?.slice(0, 4) || "N/A"}
                </span>

                <span className="flex items-center gap-1.5">
                  <MdPublic size={18} />
                  {series.origin_country?.join(", ") || "N/A"}
                </span>

                <span className="flex items-center gap-1.5">
                  <MdLanguage size={18} />
                  {series.original_language?.toUpperCase() || "N/A"}
                </span>
              </div>

              {/* Overview */}
              <p className="mt-6 max-w-3xl text-base leading-7 text-gray-300">
                {series.overview ||
                  "No overview available for this series."}
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/series/${series.id}/trailer`}>
                  <Button
                    type="button"
                    variant="danger"
                    className="inline-flex items-center gap-2 py-3"
                    leftIcon={MdPlayArrow}
                  >
                    Watch Trailer
                  </Button>
                </Link>

                <Button
                  type="button"
                  variant="danger"
                  className="inline-flex items-center gap-2 py-3"
                  leftIcon={MdFavorite}
                  onClick={() => addFavorite({ ...series, media_type: "tv", })
                  }
                >
                  Add to Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <CastSwiper
        cast={creditsData?.cast || []}
        title="Top Cast"
        subtitle={`Meet the cast of ${series.name}`}
        loading={creditsLoading}
        error={creditsError}
      />

      {/* Seasons */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        {series.seasons?.length > 0 && (
          <div className="mt-4">
            <h2 className="mb-6 text-2xl font-bold">
              Seasons
            </h2>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {series.seasons
                .filter((season) => season.season_number > 0)
                .map((season) => (
                  <Link
                    key={season.id}
                    to={`/series/${series.id}/season/${season.season_number}`}
                    className="group relative aspect-2/3 overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition hover:-translate-y-1"
                  >
                    {season.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        alt={season.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-900 text-gray-600">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-12">
                      <h3 className="font-semibold text-white transition group-hover:text-red-500">
                        {season.name}
                      </h3>

                      <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
                        <span>
                          {season.episode_count || 0} Episodes
                        </span>

                        <span>
                          {season.air_date?.slice(0, 4) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default SeriesDetails;