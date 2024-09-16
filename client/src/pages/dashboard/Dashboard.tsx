import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import NotesContainer from "./components/NotesContainer";
import SearchBar from "./components/SearchBar";
import { useAuthContext } from "../../contexts/authContext";
import useNotes from "../../hooks/useNotes";
import { Notes } from "../../types";

export default function Dashboard() {
  const [allNotes, setAllNotes] = useState<Notes[]>([]);
  const { userId } = useAuthContext();
  const { savedNotes, fetchAllNotes } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllNotes();
  }, [userId]);

  useEffect(() => {
    setAllNotes(savedNotes);
  }, [savedNotes]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <BsArrowLeft className="mr-2" size={20} />
            <span className="text-sm sm:text-base">Back home</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold">Saved Notes</h2>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm sm:text-base"
            onClick={() => navigate("/")}
          >
            <span className="mr-2">+</span> New
          </button>
        </div>

        <div className="relative mb-6 w-full max-w-lg mx-auto">
          <SearchBar />
        </div>
        {allNotes.length > 0 && <NotesContainer savedNotes={allNotes} setSavedNotes={setAllNotes} />}
      </main>
    </div>
  );
}