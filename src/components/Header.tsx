import {Link} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="absolute top-8 border border-blue-400 py-3 px-5 rounded-lg left-1/2 transform -translate-x-1/2 flex justify-center bg-white shadow-lg">
    <nav className="flex items-center justify-center gap-8">
        <Link to="/" className="text-blue-400 hover:text-blue-500">Home</Link>
        <Link to="/my-notes" className="text-blue-400 hover:text-blue-500">My Notes</Link>
        <Link to="/login" className="text-blue-400 hover:text-blue-500">Login</Link>
    </nav>
</header>



  ) 
}

export default Header