import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import MovieSwiper from "./MovieSwiper";
import { usePopularMovies, useTopRatedMovies, useNowPlayingMovies, useUpcomingMovies, useTrendingMovies, } from "../hooks/useMovies";

const Home = () => {

  // Fetch popular movies
  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = usePopularMovies();

  // Fetch top-rated movies
  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useTopRatedMovies();

  // Fetch currently playing movies
  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
  } = useNowPlayingMovies();

  // Fetch upcoming movies
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    isError: upcomingError,
  } = useUpcomingMovies();

  // Fetch trending movies
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrendingMovies();

  return (
    <div>
      {/* Hero section */}
      <HeroCarousel
        movies={nowPlayingData?.results || []}
        type="movie"
        badge="Now Playing"
        detailsPath="/movies"
        loading={nowPlayingLoading}
        error={nowPlayingError}
      />

      {/* Trending movies */}
      <MovieSwiper
        title="Trending Movies"
        subtitle="Highest trending movies"
        movies={trendingData?.results || []}
        viewAllPath="/movies"
        loading={trendingLoading}
        error={trendingError}
      />

      {/* Popular movies */}
      <MovieSwiper
        title="Popular Movies"
        subtitle="Most popular movies right now"
        movies={popularData?.results || []}
        viewAllPath="/movies"
        loading={popularLoading}
        error={popularError}
      />

      {/* Top-rated movies */}
      <MovieSwiper
        title="Top Rated Movies"
        subtitle="Highest rated movies"
        movies={topRatedData?.results || []}
        viewAllPath="/movies"
        loading={topRatedLoading}
        error={topRatedError}
      />

      {/* Upcoming movies */}
      <MovieSwiper
        title="Upcoming Movies"
        subtitle="Coming soon"
        movies={upcomingData?.results || []}
        viewAllPath="/movies"
        loading={upcomingLoading}
        error={upcomingError}
      />
    </div>
  );
};

export default Home;