import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUserDetails, logout } from "../../../services/authService";

export const DropdownLoggedIn = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const data = await getLoggedInUserDetails();
      setUser(data);
    }

    getUserDetails();
  }, [])

  const handleLogOut = () => {
    logout();
    navigate('/login');
  }

  return (
    <div
    className="z-50 absolute top-10 left-40 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    id="user-dropdown"
    style={{minWidth: '160px'}}
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
        { user && user.name }
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-slate-200">
        { user && user.email }
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={ handleLogOut }
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};
