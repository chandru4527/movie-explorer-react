import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (movie) => {
                const favorites = get().favorites;
                const mediaType = movie.media_type || "movie";

                const exists = favorites.some(
                    (item) =>
                        item.id === movie.id &&
                        (item.media_type || "movie") === mediaType
                );

                if (exists) return;

                set({
                    favorites: [
                        ...favorites,
                        {
                            ...movie,
                            media_type: mediaType,
                        },
                    ],
                });
            },

            removeFavorite: (movieId, mediaType = "movie") => {
                set((state) => ({
                    favorites: state.favorites.filter(
                        (movie) =>
                            !(
                                movie.id === movieId &&
                                (movie.media_type || "movie") === mediaType
                            )
                    ),
                }));
            },

            toggleFavorite: (movie) => {
                const favorites = get().favorites;
                const mediaType = movie.media_type || "movie";

                const exists = favorites.some(
                    (item) =>
                        item.id === movie.id &&
                        (item.media_type || "movie") === mediaType
                );

                if (exists) {
                    set({
                        favorites: favorites.filter(
                            (item) =>
                                !(
                                    item.id === movie.id &&
                                    (item.media_type || "movie") === mediaType
                                )
                        ),
                    });
                } else {
                    set({
                        favorites: [
                            ...favorites,
                            {
                                ...movie,
                                media_type: mediaType,
                            },
                        ],
                    });
                }
            },

            isFavorite: (movieId, mediaType = "movie") => {
                return get().favorites.some(
                    (movie) =>
                        movie.id === movieId &&
                        (movie.media_type || "movie") === mediaType
                );
            },

            clearFavorites: () => {
                set({
                    favorites: [],
                });
            },
        }),
        {
            name: "movie-favorites",
        }
    )
);

export default useFavoriteStore;