import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { AuthContextType } from "../../types";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext() as AuthContextType;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex  justify-between items-center">
      <div className="w-36 h-12 flex items-center space-x-4  mb-0">
        <img
          src="src/assets/logo.png"
          alt="NotesTube Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <nav className="flex md:justify-between lg:justify-end lg:gap-2 justify-end gap-6 md:gap-0 w-full md:max-w-xs items-center space-y-4 sm:space-y-0 sm:space-x-6 text-gray-300">
        <Link to="/" className="hover:text-blue-400 mt-4 md:mt-0 flex transition-colors items-center">
          <span className="md:hidden text-lg"><IoHomeOutline /></span><span className="hidden md:inline-block">Home</span>
        </Link>
        <Link to="/dashboard" className="flex hover:text-blue-400 mt-4 transition-colors items-center">
          <span className="md:hidden text-lg"><RxDashboard /></span>
          <span className="hidden md:inline-block">Dashboard</span>
        </Link>
        <div className="">
          {isAuthenticated ? (
            <button
              onClick={() => handleLogout()}
              className="flex bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors w-full sm:w-auto items-center"
            >
              {/* <span className="md:hidden text-lg"><MdLogout /></span> */}
              <span className="">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-center w-full sm:w-auto items-center"
            >
              {/* <span className="md:hidden text-lg"><FaRegUserCircle /></span> */}
              <span className="">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;