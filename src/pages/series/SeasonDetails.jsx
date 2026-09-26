import React from "react";
import { Link, useParams } from "react-router-dom";
import {
    MdArrowBack,
    MdCalendarToday,
    MdPlayArrow,
    MdStar,
    MdFavorite,
} from "react-icons/md";
import { useTvSeason } from "../../hooks/useTv";
import Image from "../../components/media/Image";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import useFavoriteStore from "../../store/favoriteStore";

const SeasonDetails = () => {
    const { id, seasonNumber } = useParams();

    const {
        data: season,
        isLoading,
        isError,
    } = useTvSeason(id, seasonNumber);

    const { addFavorite } = useFavoriteStore();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-400">
                <Loader
                    color="red"
                    size="lg"
                    text=" Loading season..."
                    className="text-xl font-bold"
                />
            </div>
        );
    }

    if (isError || !season) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-white">
                    Season Not Found
                </h2>

                <p className="mt-2 text-gray-400">
                    Unable to load this season.
                </p>

                <Link to={`/series/${id}`} className="mt-6">
                    <Button variant="danger">
                        Back to Series
                    </Button>
                </Link>
            </div>
        );
    }

    const favoriteSeason = {
        ...season,
        media_type: "tv-season",
        series_id: Number(id),
    };

    return (
        <section className="min-h-screen text-white">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <Link
                    to={`/series/${id}`}
                    className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-red-500"
                >
                    <MdArrowBack size={22} />
                    Back to Series
                </Link>

                <div className="grid gap-8 md:grid-cols-[280px_1fr]">
                    <div>
                        {season.poster_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                                alt={season.name}
                                className="w-full rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex aspect-2/3 items-center justify-center rounded-xl bg-gray-900 text-gray-600">
                                No Image
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">
                            Season {season.season_number}
                        </p>

                        <h1 className="text-3xl font-bold md:text-5xl">
                            {season.name}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <MdCalendarToday />
                                {season.air_date?.slice(0, 4) || "N/A"}
                            </span>

                            <span>
                                {season.episodes?.length || 0} Episodes
                            </span>
                        </div>

                        {season.overview && (
                            <p className="mt-6 max-w-3xl leading-7 text-gray-400">
                                {season.overview}
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to={`/series/${id}/trailer`}>
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
                                onClick={() =>
                                    addFavorite(favoriteSeason)
                                }
                            >
                                Add to Favorites
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-14">
                    <h2 className="mb-6 text-2xl font-bold">
                        Episodes
                    </h2>

                    <div className="space-y-4">
                        {season.episodes?.map((episode) => (
                            <div
                                key={episode.id}
                                className="group flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-800 bg-gray-950 p-3 transition sm:flex-row"
                            >
                                <div className="w-full shrink-0 overflow-hidden rounded-lg sm:w-48 md:w-56 lg:w-64">
                                    {episode.still_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                            alt={episode.name}
                                            className="aspect-video h-auto w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-video w-full items-center justify-center bg-gray-900 text-gray-600">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 py-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-sm font-semibold text-red-500">
                                            Episode {episode.episode_number}
                                        </span>

                                        {episode.vote_average > 0 && (
                                            <span className="flex items-center gap-1 text-sm text-gray-400">
                                                <MdStar className="text-yellow-500" />
                                                {episode.vote_average.toFixed(1)}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-1 text-lg font-semibold">
                                        {episode.name}
                                    </h3>

                                    {episode.air_date && (
                                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                            <MdCalendarToday />
                                            {episode.air_date}
                                        </p>
                                    )}

                                    {episode.overview && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                                            {episode.overview}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SeasonDetails;