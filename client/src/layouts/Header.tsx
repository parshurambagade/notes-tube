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
    <header className="border border-zinc-700  py-3 px-8 flex justify-between bg-zinc-800 text-zinc-300">
      <div className="w-32">
        <img src="src/assets/logo-no-background.svg" alt="NotesTube Logo" className="h-full w-full"/>
      </div>
    <nav className="flex items-center justify-center gap-8 text-zinc-300">
        <Link to="/" className="">Home</Link>
        <Link to="/my-notes" className="">My Notes</Link>
        <div className="">
          { authToken?.length ?
        (<button onClick={() => handleLogout()} className="px-4 py-2 rounded-md text-zinc-100 bg-red-500 hover:bg-red-600">Logout</button>) : 
        (<Link to="/login" className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</Link>)}
        </div>
    </nav>
</header>



  ) 
}

export default Header