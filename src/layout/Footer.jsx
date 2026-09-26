import React from "react";
import { Link } from "react-router-dom";
import { MdMovie, MdFavorite, MdHome, MdLocalMovies, MdTrendingUp, MdStar, MdKeyboardArrowUp, } from "react-icons/md";

import Image from "../components/media/Image";
import Button from "../components/Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: "Home", path: "/", icon: MdHome },
    { label: "Movies", path: "/movies", icon: MdLocalMovies },
    { label: "Trending", path: "/trending", icon: MdTrendingUp },
    { label: "Series", path: "/series", icon: MdStar },
    { label: "Favorites", path: "/favorites", icon: MdFavorite },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-16 border-t border-gray-800 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="shrink-0">
              <Image
                src="https://streamit-wordpress.iqonic.design/wp-content/themes/streamit/static/assets/images/logo.png"
                alt="MovieExplorer Logo"
                className="h-auto w-30 object-contain md:w-40 mb-5"
              />
            </Link>

            <p className="max-w-md text-sm leading-6 text-gray-500">
              Discover movies and series, explore trending titles, check
              ratings, and save your favorite movies in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-red-500"
                >
                  <Icon className="text-lg" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Movie Explorer Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-500">
              Find something new to watch and keep track of the movies and
              series you love.
            </p>

            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <MdFavorite />
              View Favorites
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {currentYear} Streamit. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">
              Built with React & TMDB
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
              aria-label="Scroll to top"
            >
              <MdKeyboardArrowUp className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;