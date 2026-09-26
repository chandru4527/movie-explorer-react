import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdPlayArrow, MdError } from "react-icons/md";
import { useMovieVideos } from "../hooks/useMovies";
import { useTvVideos } from "../hooks/useTv";

const Trailer = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isMovie = type === "movie";

    const movieQuery = useMovieVideos(isMovie ? id : null);
    const tvQuery = useTvVideos(!isMovie ? id : null);

    const query = isMovie ? movieQuery : tvQuery;

    const videos = query.data?.results || [];

    const trailer =
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        ) ||
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) ||
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Teaser"
        );

    if (query.isLoading) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 h-6 w-24 animate-pulse rounded bg-gray-800" />
                <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-800" />
                <div className="aspect-video animate-pulse rounded-2xl bg-gray-900" />
            </main>
        );
    }

    if (query.isError) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gray-800 bg-gray-950 py-16 text-center">
                    <MdError className="mx-auto mb-3 text-5xl text-red-500" />
                    <p className="text-gray-400">Failed to load trailer.</p>
                </div>
            </main>
        );
    }

    if (!trailer) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gray-800 bg-gray-950 py-16 text-center">
                    <MdPlayArrow className="mx-auto mb-3 text-5xl text-gray-600" />
                    <p className="text-gray-400">Trailer not available.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
            >
                <MdArrowBack className="text-xl" />
                Back
            </button>

            <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white md:text-3xl">
                <MdPlayArrow className="text-red-600" />
                Official Trailer
            </h1>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title={trailer.name}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />

            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
                {trailer.name}
            </h2>
        </main>
    );
};

export default Trailer;