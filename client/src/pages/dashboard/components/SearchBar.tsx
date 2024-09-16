import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notes } from "../../../types";
import { API_ENDPOINT } from "../../../constants";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Notes[]>([]);
  const navigate = useNavigate();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value && value.length > 2) {
      const res = await axios.get(
        `${API_ENDPOINT}/notes/search?query=${value}`,
        {
          withCredentials: true,
        }
      );
      setSuggestions(res.data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (id: string) => {
    navigate(`/notes/${id}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((notes) => (
            <li
              key={notes._id}
              onClick={() => handleSelect(notes._id)}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-100 transition-colors duration-150 ease-in-out text-sm sm:text-base"
            >
              {notes.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;