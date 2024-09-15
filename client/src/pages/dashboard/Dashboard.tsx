import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotesContainer from "./components/NotesContainer";
import SearchBar from "./components/SearchBar";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <BsArrowLeft className="mr-2" size={20} />
            Back home
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Saved Notes</h2>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            onClick={() => navigate("/")}
          >
            <span className="mr-2">+</span> New
          </button>
        </div>

        <div className="relative mb-6 w-full max-w-lg">

          <SearchBar />

          {/* <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <BsSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          /> */}
        </div>

        <NotesContainer />
      </main>
    </div>
  );
}

