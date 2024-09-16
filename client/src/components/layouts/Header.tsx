import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { AuthContextType } from "../../types";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext() as AuthContextType;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="w-36 h-12 flex items-center space-x-4 mb-4 sm:mb-0">
        <img
          src="src/assets/logo.png"
          alt="NotesTube Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <nav className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-gray-300">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
          Dashboard
        </Link>
        <div className="mt-4 sm:mt-0">
          {isAuthenticated ? (
            <button
              onClick={() => handleLogout()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors block text-center w-full sm:w-auto"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;