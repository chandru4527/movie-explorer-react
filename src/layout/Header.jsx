import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdFavorite, MdMenu, MdClose, MdPublic, MdSearch } from "react-icons/md";
import Image from "../components/media/Image";
import useFavoriteStore from "../store/favoriteStore";
import Button from '../components/Button'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavoriteStore();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "Trending", path: "/trending" },
    { label: "Series", path: "/series" },
    { label: "Tv Shows", path: "/tv-shows" },
  ];

  const iconNavItems = [
    {
      path: "/favorites",
      label: "Favorites",
      icon: MdFavorite,
      badge: favorites.length,
    },
    {
      path: "/movies",
      label: "Search Movies",
      icon: MdSearch,
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50  bg-black/80">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-20 flex items-center justify-between gap-6">

          <Link to="/" className="shrink-0">
            <Image
              src="https://streamit-wordpress.iqonic.design/wp-content/themes/streamit/static/assets/images/logo.png"
              alt="Logo"
              className="w-30 md:w-40 h-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-base transition-all ${isActive
                    ? "text-red-600 font-bold"
                    : "text-gray-100 hover:text-red-600 font-semibold"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {iconNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-base transition-all ${isActive
                      ? "font-bold text-red-600"
                      : "font-semibold text-gray-100 hover:text-red-600"
                    }`
                  }
                  aria-label={item.label}
                >
                  <Icon className="text-2xl" />

                  {item.badge > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(true)}
              className="text-white transition-all hover:bg-transparent hover:text-red-600 lg:hidden p-0"
              aria-label="Open menu"
            >
              <MdMenu className="text-3xl" />
            </Button>
          </div>

        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/70 lg:hidden transition-opacity duration-300 ${isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={closeMenu}
      >
        <aside
          className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-black border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
            <Link to="/" onClick={closeMenu}>
              <Image
                src="https://streamit-wordpress.iqonic.design/wp-content/themes/streamit/static/assets/images/logo.png"
                alt="Logo"
                className="w-32 h-auto object-contain"
              />
            </Link>

            <Button
              type="button"
              variant="ghost"
              onClick={closeMenu}
              className="text-white hover:text-red-600 transition hover:bg-transparent"
              aria-label="Close menu"
            >
              <MdClose className="text-3xl" />
            </Button>
          </div>

          <nav className="p-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-base transition-all ${isActive
                    ? "bg-red-600 text-white font-bold"
                    : "text-gray-200 hover:bg-white/10 hover:text-red-500 font-semibold"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;