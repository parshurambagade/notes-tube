import {Link, useNavigate} from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { AuthContextType } from "../types";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const {authToken, setAuthToken, setLoggedInUser} = useAuthContext() as AuthContextType;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    setAuthToken(null);
    setLoggedInUser(null);
    navigate('/login');
  }
  
  return (
    <header className="border  py-3 px-8 flex justify-between bg-white">
      <div className="w-36">
        <img src="src/assets/logo-no-background.svg" alt="NotesTube Logo" className="h-full w-full"/>
      </div>
    <nav className="flex items-center justify-center gap-8">
        <Link to="/" className="text-black hover:text-black">Home</Link>
        <Link to="/my-notes" className="text-black hover:text-black">My Notes</Link>
        <div>
          { authToken?.length ?
        (<button onClick={() => handleLogout()} className="px-4 py-2 rounded text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:bg-red-600">Logout</button>) : 
        (<Link to="/login" className="px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Login</Link>)}
        </div>
    </nav>
</header>



  ) 
}

export default Header