import React from "react";
import { Link } from "react-router-dom";
import {
    MdFavorite,
    MdFavoriteBorder,
    MdMovie,
} from "react-icons/md";
import MovieCard from "../pages/movies/MovieCard";
import useFavoriteStore from "../store/favoriteStore";
import Button from "../components/Button";

const FavoriteMovies = () => {
    const favorites = useFavoriteStore((state) => state.favorites);

    if (favorites.length === 0) {
        return (
            <section className="min-h-screen bg-black text-white px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-500">
                            <MdFavorite />
                            My Collection
                        </span>

                        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
                            Favorites
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Your favorite movies and TV shows will appear here.
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="min-h-100 rounded-2xl border border-gray-800 bg-gray-950 flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                            <MdFavoriteBorder className="text-5xl text-red-500" />
                        </div>

                        <h2 className="text-xl md:text-2xl font-semibold">
                            Your favorites list is empty
                        </h2>

                        <p className="text-gray-500 mt-2 max-w-md">
                            Start exploring movies and TV shows and add your
                            favorites to keep them here.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            <Link to="/movies">
                                <Button
                                    type="button"
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Browse Movies
                                </Button>
                            </Link>

                            <Link to="/series">
                                <Button
                                    type="button"
                                    className="border border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
                                >
                                    Browse TV Shows
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-black text-white px-6 pt-10 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-500">
                            <MdFavorite />
                            My Collection
                        </span>

                        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
                            Favorites
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Movies and TV shows you've added to your favorites.
                        </p>
                    </div>

                    {/* Favorite Count */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
                        <MdFavorite className="text-red-500 text-xl" />

                        <span className="text-sm text-gray-300">
                            {favorites.length}{" "}
                            {favorites.length === 1
                                ? "Favorite"
                                : "Favorites"}
                        </span>
                    </div>
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={`${movie.media_type || "movie"}-${movie.id}`}
                            movie={movie}
                            type={
                                movie.media_type === "tv"
                                    ? "tv"
                                    : "movie"
                            }
                        />
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-center gap-2 mt-12 text-sm text-gray-600">
                    <MdMovie />
                    <span>
                        Your favorite collection is saved for quick access.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default FavoriteMovies;