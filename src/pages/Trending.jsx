import React from "react";
import MovieSwiper from "./MovieSwiper";
import { useTrendingMovies } from "../hooks/useMovies";
import { useTrendingTv } from "../hooks/useTv";

const Trending = () => {
  const {
    data: trendingMoviesData,
    isLoading: trendingMoviesLoading,
    isError: trendingMoviesError,
  } = useTrendingMovies();

  const {
    data: trendingTvData,
    isLoading: trendingTvLoading,
    isError: trendingTvError,
  } = useTrendingTv();

  const trendingMovies = trendingMoviesData?.results || [];
  const trendingTv = trendingTvData?.results || [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="px-6 pt-10 pb-10">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
            Discover
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Trending
          </h1>

          <p className="text-gray-400 max-w-2xl">
            Discover the movies and TV series that are trending right now.
          </p>
        </div>
      </section>

      {/* Trending Movies */}
      <MovieSwiper
        title="Trending Movies"
        subtitle="Movies everyone is watching right now"
        movies={trendingMovies}
        viewAllPath="/movies"
        type="movie"
        loading={trendingMoviesLoading}
        error={trendingMoviesError}
      />

      {/* Trending TV Series */}
      <MovieSwiper
        title="Trending Series"
        subtitle="Popular series everyone is watching"
        movies={trendingTv}
        viewAllPath="/series"
        type="tv"
        loading={trendingTvLoading}
        error={trendingTvError}
      />
    </main>
  );
};

export default Trending;