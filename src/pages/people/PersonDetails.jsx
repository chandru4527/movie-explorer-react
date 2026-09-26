import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdCalendarToday, MdLocationOn, MdMovie, MdStar, } from "react-icons/md";
import { usePersonCredits, usePersonDetails } from "../../hooks/usePeople";
import Image from "../../components/media/Image";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

const PersonDetails = () => {
    const { id } = useParams();

    const {
        data: person,
        isLoading: personLoading,
        isError: personError,
    } = usePersonDetails(id);

    const {
        data: credits,
        isLoading: creditsLoading,
    } = usePersonCredits(id);

    if (personLoading) {
        return <PersonDetailsSkeleton />;
    }

    if (personError || !person) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-3">
                        Person Not Found
                    </h1>

                    <p className="text-gray-400 mb-6">
                        We couldn't load this person's details.
                    </p>

                    <Link
                        to={-1}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
                    >
                        <MdArrowBack />
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    const cast = credits?.cast || [];

    const knownFor = cast
        .filter((item) => item.poster_path)
        .sort(
            (a, b) =>
                (b.popularity || 0) - (a.popularity || 0)
        );

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateAge = (birthday, deathday) => {
        if (!birthday) return null;

        const birthDate = new Date(birthday);
        const endDate = deathday ? new Date(deathday) : new Date();

        let age = endDate.getFullYear() - birthDate.getFullYear();

        const monthDifference =
            endDate.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 &&
                endDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const age = calculateAge(
        person.birthday,
        person.deathday
    );

    console.log(person);
    

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {person.profile_path && (
                    <div className="absolute inset-0">
                        <Image
                            src={`${IMAGE_URL}${person.profile_path}`}
                            alt=""
                            className="w-full h-full object-cover blur-2xl scale-110 opacity-20"
                        />

                        <div className="absolute inset-0 bg-black/80" />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/40" />
                    </div>
                )}

                <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
                    {/* Back Button */}
                    <Link
                        to={-1}
                        className="inline-flex items-center gap-2 mb-10 text-gray-300 hover:text-red-500 transition"
                    >
                        <MdArrowBack className="text-xl" />
                        Back
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
                        {/* Profile Image */}
                        <div className="w-full max-w-[320px] mx-auto md:mx-0">
                            <div className="aspect-2/3 overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                                {person.profile_path ? (
                                    <Image
                                        src={`${IMAGE_URL}${person.profile_path}`}
                                        alt={person.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Person Information */}
                        <div className="flex flex-col justify-center">
                            <span className="text-red-500 uppercase tracking-widest text-sm font-semibold mb-3">
                                {person.known_for_department ||
                                    "Actor"}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                {person.name}
                            </h1>

                            {/* Basic Info */}
                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300 mb-8">
                                {person.birthday && (
                                    <div className="flex items-center gap-2">
                                        <MdCalendarToday className="text-red-500" />
                                        <span>
                                            {formatDate(
                                                person.birthday
                                            )}
                                        </span>
                                    </div>
                                )}

                                {age !== null && !person.deathday && (
                                    <div>
                                        <span className="text-gray-500">
                                            Age:
                                        </span>{" "}
                                        {age}
                                    </div>
                                )}

                                {person.deathday && (
                                    <div>
                                        <span className="text-gray-500">
                                            Died:
                                        </span>{" "}
                                        {formatDate(
                                            person.deathday
                                        )}
                                    </div>
                                )}

                                {person.place_of_birth && (
                                    <div className="flex items-center gap-2">
                                        <MdLocationOn className="text-red-500" />
                                        <span>
                                            {person.place_of_birth}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Biography */}
                            {person.biography && (
                                <div className="max-w-4xl">
                                    <h2 className="text-xl font-semibold mb-3">
                                        Biography
                                    </h2>

                                    <p className="text-gray-300 leading-7 whitespace-pre-line">
                                        {person.biography}
                                    </p>
                                </div>
                            )}

                            {/* Popularity */}
                            {person.popularity !== undefined && (
                                <div className="flex items-center gap-2 mt-6">
                                    <MdStar className="text-yellow-400 text-xl" />

                                    <span className="font-semibold">
                                        {person.popularity.toFixed(1)}
                                    </span>

                                    <span className="text-gray-500">
                                        Popularity
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Known For */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <span className="text-red-500 text-sm uppercase tracking-widest font-semibold">
                        Filmography
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        Known For
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Movies and TV shows featuring{" "}
                        {person.name}.
                    </p>
                </div>

                {creditsLoading ? (
                    <CreditsSkeleton />
                ) : knownFor.length === 0 ? (
                    <div className="py-16 text-center text-gray-500">
                        No filmography available.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {knownFor.map((item) => {
                            const isTv =
                                item.media_type === "tv";

                            const title =
                                item.title || item.name;

                            const date =
                                item.release_date ||
                                item.first_air_date;

                            return (
                                <Link
                                    key={`${item.media_type}-${item.id}`}
                                    to={
                                        isTv
                                            ? `/series/${item.id}`
                                            : `/movies/${item.id}`
                                    }
                                    className="group"
                                >
                                    <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-gray-900">
                                        <Image
                                            src={`${POSTER_URL}${item.poster_path}`}
                                            alt={title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent p-3 pt-10">
                                            <div className="flex items-center gap-1 text-sm">
                                                <MdStar className="text-yellow-400" />
                                                <span>
                                                    {item.vote_average?.toFixed(
                                                        1
                                                    ) || "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="mt-3 font-semibold text-white truncate group-hover:text-red-500 transition">
                                        {title}
                                    </h3>

                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                        <span>
                                            {date?.slice(
                                                0,
                                                4
                                            ) || "N/A"}
                                        </span>

                                        <span>•</span>

                                        <span className="uppercase">
                                            {isTv
                                                ? "TV"
                                                : "Movie"}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
};

const PersonDetailsSkeleton = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="animate-pulse">
                    <div className="h-5 w-20 bg-gray-800 rounded mb-10" />

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
                        <div className="aspect-2/3 rounded-2xl bg-gray-800" />

                        <div className="space-y-5">
                            <div className="h-4 w-28 bg-gray-800 rounded" />

                            <div className="h-12 w-3/4 bg-gray-800 rounded" />

                            <div className="h-5 w-1/2 bg-gray-800 rounded" />

                            <div className="space-y-3 mt-8">
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-4/5 bg-gray-800 rounded" />
                                <div className="h-4 w-3/5 bg-gray-800 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const CreditsSkeleton = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse"
                >
                    <div className="aspect-2/3 rounded-xl bg-gray-800" />
                    <div className="h-4 bg-gray-800 rounded mt-3 w-4/5" />
                    <div className="h-3 bg-gray-800 rounded mt-2 w-1/2" />
                </div>
            ))}
        </div>
    );
};

export default PersonDetails;