import React from "react";
import HeroCarousel from "../../components/HeroCarousel";
import MovieSwiper from "../MovieSwiper";
import {
  useTrendingTv,
  usePopularTv,
  useTopRatedTv,
  useOnTheAirTv,
} from "../../hooks/useTv";

const Series = () => {
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrendingTv();

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = usePopularTv();

  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useTopRatedTv();

  const {
    data: onTheAirData,
    isLoading: onTheAirLoading,
    isError: onTheAirError,
  } = useOnTheAirTv();

  return (
    <main className="min-h-screen bg-black">
      {/* Trending Series Hero */}
      <HeroCarousel
        movies={trendingData?.results || []}
        type="tv"
        badge="Trending Series"
        detailsPath="/series"
        loading={trendingLoading}
        error={trendingError}
      />

      {/* Trending Series */}
      <MovieSwiper
        title="Trending Series"
        subtitle="Popular series everyone is watching"
        movies={trendingData?.results || []}
        viewAllPath="/series"
        loading={trendingLoading}
        error={trendingError}
        type="tv"
      />

      {/* Popular Series */}
      <MovieSwiper
        title="Popular Series"
        subtitle="Most popular TV series right now"
        movies={popularData?.results || []}
        viewAllPath="/series"
        loading={popularLoading}
        error={popularError}
        type="tv"
      />

      {/* Top Rated Series */}
      <MovieSwiper
        title="Top Rated Series"
        subtitle="Highest rated TV series"
        movies={topRatedData?.results || []}
        viewAllPath="/series"
        loading={topRatedLoading}
        error={topRatedError}
        type="tv"
      />

      {/* On The Air Series */}
      <MovieSwiper
        title="On The Air"
        subtitle="Series currently airing"
        movies={onTheAirData?.results || []}
        viewAllPath="/series"
        loading={onTheAirLoading}
        error={onTheAirError}
        type="tv"
      />
    </main>
  );
};

export default Series;