import { createBrowserRouter } from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Home from "../pages/Home";
import Movies from "../pages/movies/Movies";
import MovieDetails from "../pages/movies/MovieDetails";
import Series from "../pages/series/Series";
import SeriesDetails from "../pages/series/SeriesDetails";
import FavoriteMovies from "../pages/FavoriteMovies";
import Trending from "../pages/Trending";
import TvShows from "../pages/series/TvShows";
import PersonDetails from '../pages/people/PersonDetails'
import Trailer from '../pages/Trailer'
import SeasonDetails from "../pages/series/SeasonDetails";
import NotFound from "../pages/NotFoundPage";
import ErrorPage from "../pages/ErrorPage";


const Routers = createBrowserRouter([
    {
        element: <IndexLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/movies/:id",
                element: <MovieDetails />,
            },
            {
                path: "/series",
                element: <Series />,
            },
            {
                path: "/series/:id",
                element: <SeriesDetails />,
            },
            {
                path: "/trending",
                element: <Trending />,
            },
            {
                path: "/favorites",
                element: <FavoriteMovies />,
            },
            {
                path: "/tv-shows",
                element: <TvShows />,
            },
            {
                path: "/cast/:id",
                element: <PersonDetails />,
            },
            {
                path: "/movies/:id/trailer",
                element: <Trailer type="movie" />,
            },
            {
                path: "/series/:id/trailer",
                element: <Trailer type="series" />,
            },
            {
                path: "/tv-shows/:id/trailer",
                element: <Trailer type="tv" />,
            },
            {
                path: "/series/:id/season/:seasonNumber",
                element: <SeasonDetails />,
            },
            // {
            //     path: "/test-error",
            //     element: <Home />,
            //     loader: () => {
            //         throw new Error("Something went wrong!");
            //     },
            // },
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default Routers;