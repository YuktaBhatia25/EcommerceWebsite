import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../assets/logo.png";
import DarkLogo from "../../../assets/dark-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DropdownLoggedIn } from "./DropdownLoggedIn";
import { DropdownLoggedOut } from "./DropdownLoggedOut";
import { useClickOutside } from "../../../hooks";
import { isLoggedIn } from "../../../services/authService";

export const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
  
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => {
    setIsDropdownVisible(false);
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if(darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  
  const loginStatus = isLoggedIn();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const searchValue = evt.target.search.value;
    evt.target.search.value = "";
    navigate(`/products?q=${searchValue}`);
  }

  const inactiveNavLink =
    "block py-2 px-3 rounded text-slate-800 hover:text-white md:p-0 dark:text-white dark:hover:text-primary-800";
  const activeNavLink =
    "block py-2 px-3 rounded text-white hover:text-slate-800 md:p-0 dark:text-primary-800 dark:hover:text-white";

  return (
    <nav className="bg-primary-800 dark:border-b dark:border-gray-600 dark:bg-slate-900 text-slate-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={darkMode ? DarkLogo : Logo} className="h-14" alt="Purity Plants" />
          <span className="sr-only">Purity Plants</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative text-2xl dark:text-white">
          {/* SEARCH BAR */}
          <div className="relative hidden md:block mr-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-slate-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                name="search"
              />
            </form>
          </div>

          <div className="dark:hover:text-primary-800 hover:text-white">
            { !darkMode && <button onClick={() => setDarkMode(true) } className="mr-3"><i className="bi-sun"></i></button> }
            { darkMode && <button onClick={() => setDarkMode(false) } className="mr-3"><i className="bi-moon"></i></button> }
          </div>

          <div className="dark:hover:text-primary-800 hover:text-white">
            <Link to="/cart" className="mr-3">
              <i className="bi-cart3"></i>
            </Link>
          </div>

          {/* USER ICON WITH DROPDOWN */}
          <div ref={dropdownRef} className="dark:hover:text-primary-800 hover:text-white">
            <button
              type="button"
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              className="flex rounded-full md:me-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <i className="bi-person-circle"></i>
            </button>
            {loginStatus && isDropdownVisible && <DropdownLoggedIn />}
            {!loginStatus && isDropdownVisible && <DropdownLoggedOut />}
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-slate-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                name="search"
              />
            </form>
          </div>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeNavLink : inactiveNavLink
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? activeNavLink : inactiveNavLink
                }
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
