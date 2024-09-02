import {Link, useNavigate} from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { AuthContextType } from "../types";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const {authToken, setAuthToken, setUserId} = useAuthContext() as AuthContextType;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setAuthToken(null);
    setUserId(null);
    navigate('/login');
  }
  
  return (
    <header className="border border-gray-700  py-1 px-8 flex justify-between bg-gray-800 text-gray-300">
      <div className="w-36 h-12">
        <img src="src/assets/logo.png" alt="NotesTube Logo" className="h-full w-full"/>
      </div>
    <nav className="flex items-center text-sm my-2 justify-center gap-8 text-gray-300">
        <Link to="/" className="">Home</Link>
        <Link to="/my-notes" className="">My Notes</Link>
        <div className="">
          { authToken?.length ?
        (<button onClick={() => handleLogout()} className="px-3 py-2 rounded-md text-gray-100 bg-red-600 hover:bg-red-700">Logout</button>) : 
        (<Link to="/login" className="px-3 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">Login</Link>)}
        </div>
    </nav>
</header>



  ) 
}

export default Header