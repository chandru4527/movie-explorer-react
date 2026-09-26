import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    MdStar,
    MdFavorite,
    MdFavoriteBorder,
} from "react-icons/md";
import Image from "../../components/media/Image";
import useFavoriteStore from "../../store/favoriteStore";
import Button from "../../components/Button";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, type = "movie" }) => {
    const location = useLocation();
    const { toggleFavorite, isFavorite } = useFavoriteStore();

    const isTv = type === "tv";
    const mediaType = isTv ? "tv" : "movie";

    const favorite = isFavorite(movie.id, mediaType);

    const title = isTv
        ? movie.name || movie.title
        : movie.title || movie.name;

    const releaseDate = isTv
        ? movie.first_air_date
        : movie.release_date;

    const detailsPath = isTv
        ? `/series/${movie.id}`
        : `/movies/${movie.id}`;

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleFavorite({
            ...movie,
            media_type: mediaType,
        });
    };

    return (
        <div className="group">
            <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-gray-900">
                <Link
                    to={detailsPath}
                    state={{ from: location.pathname }}
                >
                    <Image
                        src={
                            movie.poster_path
                                ? `${IMAGE_URL}${movie.poster_path}`
                                : ""
                        }
                        alt={title || "Movie"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                <Button
                    type="button"
                    onClick={handleFavorite}
                    className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-black"
                    aria-label={
                        favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {favorite ? (
                        <MdFavorite className="text-xl text-red-500" />
                    ) : (
                        <MdFavoriteBorder className="text-xl" />
                    )}
                </Button>

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-sm text-white">
                    <MdStar className="text-yellow-400" />
                    <span>
                        {movie.vote_average?.toFixed(1) || "N/A"}
                    </span>
                </div>
            </div>

            <div className="mt-3">
                <h2 className="truncate font-semibold text-white">
                    {title || "Unknown Title"}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                    <span>
                        {releaseDate?.slice(0, 4) || "N/A"}
                    </span>
                    <span>•</span>
                    <span>
                        {movie.original_language?.toUpperCase() || "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;