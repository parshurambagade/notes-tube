import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { AuthContextType } from "../../types";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext() as AuthContextType;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="w-36 h-12 flex items-center space-x-4">
        <img
          src="src/assets/logo.png"
          alt="NotesTube Logo"
          className="h-full w-full"
        />
      </div>
      <nav className="flex items-center space-x-6 text-gray-300">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link to="/my-notes" className="hover:text-blue-400 transition-colors">
          My Notes
        </Link>
        <div className="">
          {isAuthenticated ? (
            <button
              onClick={() => handleLogout()}
               className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
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
