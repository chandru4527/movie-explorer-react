import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useDiscoverMovies,
  useGenres,
  useMovieSearch,
} from "../../hooks/useMovies";
import MovieCard from "../movies/MovieCard";
import { MdSearch, MdRefresh } from "react-icons/md";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Loader from '../../components/Loader'

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filters from URL
  const searchParam = searchParams.get("search") || "";
  const genreParam = searchParams.get("genre") || "";
  const yearParam = searchParams.get("year") || "";
  const ratingParam = searchParams.get("rating") || "";
  const languageParam = searchParams.get("language") || "";

  const [search, setSearch] = useState(searchParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [genre, setGenre] = useState(genreParam);
  const [year, setYear] = useState(yearParam);
  const [rating, setRating] = useState(ratingParam);
  const [language, setLanguage] = useState(languageParam);

  const loadMoreRef = useRef(null);

  const { data: genreData } = useGenres();

  // Keep local state synchronized with URL
  useEffect(() => {
    setSearch(searchParam);
    setSearchQuery(searchParam);
    setGenre(genreParam);
    setYear(yearParam);
    setRating(ratingParam);
    setLanguage(languageParam);
  }, [
    searchParam,
    genreParam,
    yearParam,
    ratingParam,
    languageParam,
  ]);

  // Update URL
  const updateUrlParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch = search.trim();

      setSearchQuery(trimmedSearch);

      updateUrlParams({
        search: trimmedSearch,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filters = {
    sort_by: "popularity.desc",
    ...(genre && { with_genres: genre }),
    ...(year && { primary_release_year: year }),
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
  } = useDiscoverMovies(filters);

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useMovieSearch(searchQuery);

  const isSearching = Boolean(searchQuery);

  const discoverMovies =
    discoverData?.pages?.flatMap((page) => page.results || []) || [];

  const searchMovies =
    searchData?.pages?.flatMap((page) => page.results || []) || [];

  const filteredSearchMovies = searchMovies.filter((movie) => {
    const matchesGenre =
      !genre || movie.genre_ids?.includes(Number(genre));

    const matchesYear =
      !year ||
      movie.release_date?.startsWith(String(year));

    const matchesRating =
      !rating ||
      Number(movie.vote_average || 0) >= Number(rating);

    const matchesLanguage =
      !language || movie.original_language === language;

    return (
      matchesGenre &&
      matchesYear &&
      matchesRating &&
      matchesLanguage
    );
  });

  const movies = isSearching
    ? filteredSearchMovies
    : discoverMovies;

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

  // Infinite scroll
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

  const handleGenreChange = (value) => {
    setGenre(value);

    updateUrlParams({
      genre: value,
    });
  };

  const handleYearChange = (value) => {
    setYear(value);

    updateUrlParams({
      year: value,
    });
  };

  const handleRatingChange = (value) => {
    setRating(value);

    updateUrlParams({
      rating: value,
    });
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);

    updateUrlParams({
      language: value,
    });
  };

  const handleReset = () => {
    setSearch("");
    setSearchQuery("");
    setGenre("");
    setYear("");
    setRating("");
    setLanguage("");

    setSearchParams({});
  };

  const hasFilters =
    search ||
    genre ||
    year ||
    rating ||
    language;

  const years = Array.from(
    { length: 30 },
    (_, index) => {
      const currentYear = new Date().getFullYear();

      return currentYear - index;
    }
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
    <section className="min-h-screen bg-black text-white pt-10 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Movies
          </h1>

          <p className="text-gray-400 mt-2">
            Discover movies and find your next favorite.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          <Input
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={MdSearch}
            iconPosition="left"
            inputClassName="bg-gray-900 placeholder:text-white"
          />

          <Select
            name="genre"
            value={genre}
            onChange={(e) =>
              handleGenreChange(e.target.value)
            }
            options={[
              { value: "", label: "All Genres" },
              ...genres.map((item) => ({
                value: item.id,
                label: item.name,
              })),
            ]}
            placeholder="All Genres"
            selectClassName="bg-gray-900 border-gray-800 text-white"
          />

          <Select
            name="year"
            value={year}
            onChange={(e) =>
              handleYearChange(e.target.value)
            }
            options={[
              { value: "", label: "All Years" },
              ...years.map((item) => ({
                value: item,
                label: item,
              })),
            ]}
            placeholder="All Years"
            selectClassName="bg-gray-900 border-gray-800 text-white"
          />

          <Select
            name="rating"
            value={rating}
            onChange={(e) =>
              handleRatingChange(e.target.value)
            }
            options={[
              { value: "", label: "All Ratings" },
              { value: "8", label: "8+" },
              { value: "7", label: "7+" },
              { value: "6", label: "6+" },
              { value: "5", label: "5+" },
            ]}
            placeholder="All Ratings"
            selectClassName="bg-gray-900 border-gray-800 text-white"
          />

          <Select
            name="language"
            value={language}
            onChange={(e) =>
              handleLanguageChange(e.target.value)
            }
            options={languageOptions}
            placeholder="All Languages"
            selectClassName="bg-gray-900 border-gray-800 text-white"
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

        {isLoading && movies.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="aspect-2/3 rounded-xl bg-gray-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="py-20 text-center">
            <p className="text-gray-400">
              Failed to load movies.
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
          movies.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400">
                No movies found.
              </p>
            </div>
          )}

        {!isError && movies.length > 0 && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>

            {hasNextPage && (
              <div
                ref={loadMoreRef}
                className="flex justify-center py-10"
              >
                {isFetchingNextPage && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <Loader size="lg" text={'Loading Movies.....'} color="red" className="text-xl font-bold"  />
                  </div>
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

export default Movies;