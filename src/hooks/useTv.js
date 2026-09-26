import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/axios";
import { TMDB_ENDPOINTS } from "../api/endpoits";

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

export const useAiringTodayTv = (page = 1) => {
    return useQuery({
        queryKey: ["airing-today-tv", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.AIRING_TODAY_TV, { page }),
    });
};

export const useOnTheAirTv = (page = 1) => {
    return useQuery({
        queryKey: ["on-the-air-tv", page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.ON_THE_AIR_TV, { page }),
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

export const useSimilarTv = (id, page = 1) => {
    return useQuery({
        queryKey: ["similar-tv", id, page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.SIMILAR_TV(id), { page }),
        enabled: !!id,
    });
};

export const useTvSearch = (query, page = 1) => {
    return useQuery({
        queryKey: ["tv-search", query, page],
        queryFn: () => fetchData(TMDB_ENDPOINTS.SEARCH_TV, { query, page }),
        enabled: !!query?.trim(),
    });
};

export const useTvGenres = () => {
    return useQuery({
        queryKey: ["tv-genres"],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_GENRES),
    });
};

export const useTvByGenre = (genreId, page = 1) => {
    return useQuery({
        queryKey: ["tv-by-genre", genreId, page],
        queryFn: () =>
            fetchData(TMDB_ENDPOINTS.TV_DISCOVER, {
                with_genres: genreId,
                page,
            }),
        enabled: !!genreId,
    });
};

export const useDiscoverTv = (filters = {}) => {
    return useQuery({
        queryKey: ["discover-tv", filters],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_DISCOVER, filters),
    });
};

// Infinite TV search
export const useInfiniteTvSearch = (query) => {
    return useInfiniteQuery({
        queryKey: ["infinite-tv-search", query],
        queryFn: ({ pageParam = 1 }) =>
            fetchData(TMDB_ENDPOINTS.SEARCH_TV, {
                query,
                page: pageParam,
            }),
        initialPageParam: 1,
        enabled: !!query?.trim(),
        getNextPageParam: (lastPage) => {
            if (!lastPage?.page || !lastPage?.total_pages) {
                return undefined;
            }

            return lastPage.page < lastPage.total_pages
                ? lastPage.page + 1
                : undefined;
        },
    });
};

// Infinite TV discover
export const useInfiniteDiscoverTv = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ["infinite-discover-tv", filters],
        queryFn: ({ pageParam = 1 }) =>
            fetchData(TMDB_ENDPOINTS.TV_DISCOVER, {
                ...filters,
                page: pageParam,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.page || !lastPage?.total_pages) {
                return undefined;
            }

            return lastPage.page < lastPage.total_pages
                ? lastPage.page + 1
                : undefined;
        },
    });
};

export const useTvVideos = (id) => {
    return useQuery({
        queryKey: ["tv-videos", id],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_VIDEOS(id)),
        enabled: !!id,
    });
};

export const useTvSeason = (id, seasonNumber) => {
    return useQuery({
        queryKey: ["tv-season", id, seasonNumber],
        queryFn: () => fetchData(TMDB_ENDPOINTS.TV_SEASON(id, seasonNumber)),
        enabled: !!id && seasonNumber !== undefined,
    });
};