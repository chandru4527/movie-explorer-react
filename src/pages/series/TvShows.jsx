import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    useInfiniteDiscoverTv,
    useInfiniteTvSearch,
    useTvGenres,
} from "../../hooks/useTv";
import MovieCard from "../movies/MovieCard";
import { MdRefresh, MdSearch } from "react-icons/md";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const TvShows = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    const loadMoreRef = useRef(null);

    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "";
    const year = searchParams.get("year") || "";
    const rating = searchParams.get("rating") || "";
    const language = searchParams.get("language") || "";

    const { data: genreData } = useTvGenres();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(search.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const updateFilter = (name, value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        setSearchParams(params);
    };

    const filters = {
        sort_by: "popularity.desc",
        ...(genre && { with_genres: genre }),
        ...(year && { first_air_date_year: year }),
        ...(rating && { "vote_average.gte": rating }),
        ...(language && { with_original_language: language }),
    };

    const {
        data: discoverData,
        isLoading: discoverLoading,
        isError: discoverError,
        fetchNextPage: fetchNextDiscoverPage,
        hasNextPage: hasNextDiscoverPage,
        isFetchingNextPage: isFetchingNextDiscoverPage,
    } = useInfiniteDiscoverTv(filters);

    const {
        data: searchData,
        isLoading: searchLoading,
        isError: searchError,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasNextSearchPage,
        isFetchingNextPage: isFetchingNextSearchPage,
    } = useInfiniteTvSearch(searchQuery);

    const isSearching = Boolean(searchQuery);

    const discoverTv =
        discoverData?.pages?.flatMap((page) => page.results || []) || [];

    const searchTv =
        searchData?.pages?.flatMap((page) => page.results || []) || [];

    const filteredSearchTv = searchTv.filter((show) => {
        const matchesGenre =
            !genre || show.genre_ids?.includes(Number(genre));

        const matchesYear =
            !year ||
            show.first_air_date?.startsWith(String(year));

        const matchesRating =
            !rating ||
            Number(show.vote_average || 0) >= Number(rating);

        const matchesLanguage =
            !language || show.original_language === language;

        return (
            matchesGenre &&
            matchesYear &&
            matchesRating &&
            matchesLanguage
        );
    });

    const tvShows = isSearching ? filteredSearchTv : discoverTv;

    const isLoading = isSearching
        ? searchLoading
        : discoverLoading;

    const isError = isSearching
        ? searchError
        : discoverError;

    const hasNextPage = isSearching
        ? hasNextSearchPage
        : hasNextDiscoverPage;

    const isFetchingNextPage = isSearching
        ? isFetchingNextSearchPage
        : isFetchingNextDiscoverPage;

    const fetchNextPage = isSearching
        ? fetchNextSearchPage
        : fetchNextDiscoverPage;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (
                    firstEntry.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "500px",
            }
        );

        const currentRef = loadMoreRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    ]);

    const genres = genreData?.genres || [];

    const handleReset = () => {
        setSearchParams({});
        setSearchQuery("");
    };

    const hasFilters =
        search ||
        genre ||
        year ||
        rating ||
        language;

    const years = Array.from(
        { length: 30 },
        (_, index) => new Date().getFullYear() - index
    );

    const languageOptions = [
        { value: "", label: "All Languages" },
        { value: "en", label: "English" },
        { value: "ta", label: "Tamil" },
        { value: "te", label: "Telugu" },
        { value: "ml", label: "Malayalam" },
        { value: "hi", label: "Hindi" },
        { value: "kn", label: "Kannada" },
        { value: "bn", label: "Bengali" },
        { value: "mr", label: "Marathi" },
        { value: "gu", label: "Gujarati" },
        { value: "pa", label: "Punjabi" },
        { value: "ko", label: "Korean" },
        { value: "ja", label: "Japanese" },
        { value: "zh", label: "Chinese" },
        { value: "fr", label: "French" },
        { value: "de", label: "German" },
        { value: "es", label: "Spanish" },
        { value: "it", label: "Italian" },
        { value: "pt", label: "Portuguese" },
        { value: "ru", label: "Russian" },
        { value: "ar", label: "Arabic" },
        { value: "tr", label: "Turkish" },
    ];

    return (
        <section className="min-h-screen bg-black px-6 pb-16 pt-10 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        TV Shows
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Discover TV shows and find your next favorite series.
                    </p>
                </div>

                <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    <Input
                        placeholder="Search TV shows..."
                        value={search}
                        onChange={(e) =>
                            updateFilter("search", e.target.value)
                        }
                        icon={MdSearch}
                        iconPosition="left"
                        inputClassName="bg-gray-900 placeholder:text-white"
                    />

                    <Select
                        name="genre"
                        value={genre}
                        onChange={(e) =>
                            updateFilter("genre", e.target.value)
                        }
                        options={[
                            {
                                value: "",
                                label: "All Genres",
                            },
                            ...genres.map((item) => ({
                                value: item.id,
                                label: item.name,
                            })),
                        ]}
                        placeholder="All Genres"
                        selectClassName="border-gray-800 bg-gray-900 text-white"
                    />

                    <Select
                        name="year"
                        value={year}
                        onChange={(e) =>
                            updateFilter("year", e.target.value)
                        }
                        options={[
                            {
                                value: "",
                                label: "All Years",
                            },
                            ...years.map((item) => ({
                                value: item,
                                label: item,
                            })),
                        ]}
                        placeholder="All Years"
                        selectClassName="border-gray-800 bg-gray-900 text-white"
                    />

                    <Select
                        name="rating"
                        value={rating}
                        onChange={(e) =>
                            updateFilter("rating", e.target.value)
                        }
                        options={[
                            {
                                value: "",
                                label: "All Ratings",
                            },
                            {
                                value: "8",
                                label: "8+",
                            },
                            {
                                value: "7",
                                label: "7+",
                            },
                            {
                                value: "6",
                                label: "6+",
                            },
                            {
                                value: "5",
                                label: "5+",
                            },
                        ]}
                        placeholder="All Ratings"
                        selectClassName="border-gray-800 bg-gray-900 text-white"
                    />

                    <Select
                        name="language"
                        value={language}
                        onChange={(e) =>
                            updateFilter("language", e.target.value)
                        }
                        options={languageOptions}
                        placeholder="All Languages"
                        selectClassName="border-gray-800 bg-gray-900 text-white"
                    />

                    {hasFilters && (
                        <div className="flex items-center">
                            <Button
                                type="button"
                                onClick={handleReset}
                                leftIcon={MdRefresh}
                                variant="danger"
                                className="inline-flex items-center gap-2 text-sm text-white hover:text-white"
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>

                {isLoading && tvShows.length === 0 && (
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-2/3 animate-pulse rounded-xl bg-gray-900"
                            />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="py-20 text-center">
                        <p className="text-gray-400">
                            Failed to load TV shows.
                        </p>

                        <Button
                            type="button"
                            onClick={handleReset}
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    tvShows.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400">
                                No TV shows found.
                            </p>
                        </div>
                    )}

                {!isError && tvShows.length > 0 && (
                    <>
                        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6">
                            {tvShows.map((show) => (
                                <MovieCard
                                    key={show.id}
                                    movie={show}
                                    type="tv"
                                />
                            ))}
                        </div>

                        {hasNextPage && (
                            <div
                                ref={loadMoreRef}
                                className="flex justify-center py-10"
                            >
                                {isFetchingNextPage && (
                                    <Loader
                                        size="lg"
                                        text="Loading Series....."
                                        color="red"
                                        className="text-xl font-bold"
                                    />
                                )}
                            </div>
                        )}

                        {!hasNextPage && (
                            <p className="py-10 text-center text-sm text-gray-500">
                                You've reached the end.
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default TvShows;