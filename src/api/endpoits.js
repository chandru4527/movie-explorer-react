export const TMDB_ENDPOINTS = {

  TRENDING_MOVIES: "/trending/movie/week",
  POPULAR_MOVIES: "/movie/popular",
  NOW_PLAYING: "/movie/now_playing",
  TOP_RATED: "/movie/top_rated",
  UPCOMING: "/movie/upcoming",
  GENRES: "/genre/movie/list",

  MOVIE_DETAILS: (id) => `/movie/${id}`,
  MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
  SIMILAR_MOVIES: (id) => `/movie/${id}/similar`,
  MOVIE_VIDEOS: (id) => `/movie/${id}/videos`,

  SEARCH_MOVIES: "/search/movie",
  MOVIES_BY_GENRE: "/discover/movie",
  MOVIES_DISCOVER: "/discover/movie",

  TRENDING_TV: "/trending/tv/week",
  POPULAR_TV: "/tv/popular",
  TOP_RATED_TV: "/tv/top_rated",
  AIRING_TODAY_TV: "/tv/airing_today",
  ON_THE_AIR_TV: "/tv/on_the_air",

  TV_DETAILS: (id) => `/tv/${id}`,
  TV_CREDITS: (id) => `/tv/${id}/credits`,
  SIMILAR_TV: (id) => `/tv/${id}/similar`,
  TV_VIDEOS: (id) => `/tv/${id}/videos`,
  TV_SEASON: (id, seasonNumber) => `/tv/${id}/season/${seasonNumber}`,

  SEARCH_TV: "/search/tv",
  TV_GENRES: "/genre/tv/list",
  TV_DISCOVER: "/discover/tv",

  PERSON_DETAILS: (id) => `/person/${id}`,
  PERSON_CREDITS: (id) => `/person/${id}/combined_credits`,

};