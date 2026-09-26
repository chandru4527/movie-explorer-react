import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdCalendarToday, MdAccessTime, MdStar, MdPlayArrow, MdFavorite, } from "react-icons/md";
import { useMovieCredits, useMovieDetails } from "../../hooks/useMovies";
import CastSwiper from "../CastSwiper";
import Image from "../../components/media/Image";
import Button from "../../components/Button";
import useFavoriteStore from "../../store/favoriteStore";

import Loader from '../../components/Loader'

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
  } = useMovieDetails(id);

  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useMovieCredits(id);

  const { addFavorite } = useFavoriteStore();

  if (movieLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader color="red" size="lg" text={'Loading  Movie.....'} className="text-xl font-bold" />
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <p>Movie not found.</p>

        <Link
          to="/movies"
          className="rounded-lg bg-white px-5 py-2 text-black transition hover:bg-gray-200"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Movie Hero */}
      <section className="relative min-h-162.5 overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`${IMAGE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
          {/* Back */}
          <Link
            to={-1}
            className="mb-16 inline-flex items-center gap-2 text-gray-300 transition hover:text-white"
          >
            <MdArrowBack size={22} />
            Back
          </Link>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
            {/* Poster */}
            <Image
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-56 rounded-xl shadow-2xl md:w-64"
            />

            {/* Details */}
            <div className="max-w-3xl">
              <h1 className="mb-5 text-4xl font-bold md:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mb-5 text-lg italic text-gray-300">
                  {movie.tagline}
                </p>
              )}

              {/* Meta */}
              <div className="mb-6 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1">
                  <MdStar className="text-yellow-400" />
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span className="flex items-center gap-1">
                  <MdCalendarToday size={17} />
                  {movie.release_date || "N/A"}
                </span>

                <span className="flex items-center gap-1">
                  <MdAccessTime size={18} />
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "N/A"}
                </span>
              </div>

              {/* Genres */}
              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="leading-7 text-gray-300">
                {movie.overview || "No overview available."}
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to={`/movies/${movie.id}/trailer`}>
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
                  onClick={() => addFavorite(movie)}
                >
                  Add to Favorite
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cast */}
      <CastSwiper
        cast={credits?.cast || []}
        title="Top Cast"
        subtitle={`Meet the cast of ${movie.title}`}
        loading={creditsLoading}
        error={creditsError}
      />
    </div>
  );
};

export default MovieDetails;