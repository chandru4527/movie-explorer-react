import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchData } from "../api/axios";
import { TMDB_ENDPOINTS } from "../api/endpoits";

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ["trending-movies"],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TRENDING_MOVIES),
    });
};

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popular-movies", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.POPULAR_MOVIES, { page }),
    });
};

export const useNowPlayingMovies = (page = 1) => {
    return useQuery({
        queryKey: ["now-playing-movies", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.NOW_PLAYING, { page }),
    });
};

export const useTopRatedMovies = (page = 1) => {
    return useQuery({
        queryKey: ["top-rated-movies", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TOP_RATED, { page }),
    });
};

export const useUpcomingMovies = (page = 1) => {
    return useQuery({
        queryKey: ["upcoming-movies", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.UPCOMING, { page }),
    });
};

export const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => fetchData(TMDB_ENDPOINTS.GENRES),
    });
};

export const useMovieDetails = (id) => {
    return useQuery({
        queryKey: ["movie-details", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.MOVIE_DETAILS(id)),
        enabled: !!id,
    });
};

export const useMovieCredits = (id) => {
    return useQuery({
        queryKey: ["movie-credits", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.MOVIE_CREDITS(id)),
        enabled: !!id,
    });
};

export const useSimilarMovies = (id, page = 1) => {
    return useQuery({
        queryKey: ["similar-movies", id, page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.SIMILAR_MOVIES(id), { page }),
        enabled: !!id,
    });
};

export const useMoviesByGenre = (genreId, page = 1) => {
    return useQuery({
        queryKey: ["movies-by-genre", genreId, page],
        queryFn: () =>
            fetchData(TMDB_ENDPOINTS.MOVIES_BY_GENRE, {
                with_genres: genreId,
                page,
            }),
        enabled: !!genreId,
    });
};

export const useMovieSearch = (query) => {
    return useInfiniteQuery({
        queryKey: ["movie-search", query],
        queryFn: ({ pageParam = 1 }) =>
            fetchData(TMDB_ENDPOINTS.SEARCH_MOVIES, {
                query,
                page: pageParam,
            }),
        initialPageParam: 1,
        enabled: !!query?.trim(),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            const totalPages = Math.min(lastPage?.total_pages || 1, 500);

            return nextPage <= totalPages ? nextPage : undefined;
        },
    });
};

export const useDiscoverMovies = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ["discover-movies", filters],
        queryFn: ({ pageParam = 1 }) =>
            fetchData(TMDB_ENDPOINTS.MOVIES_DISCOVER, {
                ...filters,
                page: pageParam,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            const totalPages = Math.min(lastPage?.total_pages || 1, 500);

            return nextPage <= totalPages ? nextPage : undefined;
        },
    });
};

export const useTrendingTv = () => {
    return useQuery({
        queryKey: ["trending-tv"],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TRENDING_TV),
    });
};

export const usePopularTv = (page = 1) => {
    return useQuery({
        queryKey: ["popular-tv", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.POPULAR_TV, { page }),
    });
};

export const useTopRatedTv = (page = 1) => {
    return useQuery({
        queryKey: ["top-rated-tv", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TOP_RATED_TV, { page }),
    });
};

export const useTvDetails = (id) => {
    return useQuery({
        queryKey: ["tv-details", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_DETAILS(id)),
        enabled: !!id,
    });
};

export const useTvCredits = (id) => {
    return useQuery({
        queryKey: ["tv-credits", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_CREDITS(id)),
        enabled: !!id,
    });
};

export const useTvSearch = (query, page = 1) => {
    return useQuery({
        queryKey: ["tv-search", query, page],
        queryFn: () =>
            fetchData(TMDB_ENDPOINTS.SEARCH_TV, {
                query,
                page,
            }),
        enabled: !!query?.trim(),
    });
};

export const useMovieVideos = (id) => {
    return useQuery({
        queryKey: ["movie-videos", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.MOVIE_VIDEOS(id)),
        enabled: !!id,
    });
};