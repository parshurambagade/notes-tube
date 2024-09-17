import React, { useEffect, useState } from "react";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { Link, useParams } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import NotesContent from "./components/NotesContent";
import { FiSave } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";

const EditNotes: React.FC = () => {
  const { notes } = useCurrentNotesContext();
  const { fetchNotes, updateNotes } = useNotes();
  const { notesId } = useParams<{ notesId: string }>();
  const [notesContent, setNotesContent] = useState("");

  useEffect(() => {
    if (notesId) {
      fetchNotes(notesId);
    }
  }, [notesId, fetchNotes]);

  useEffect(() => {
    if (notes.content) {
      setNotesContent(notes.content);
    }
  }, [notes]);

  const handleSaveChanges = async () => {
    if (notesId) {
      await updateNotes(notesId, notesContent);
    }
  };

  if (!notesContent.length) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 md:p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4 md:mb-6 gap-4">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors text-sm sm:text-base"
          >
            <IoArrowBackSharp className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base"
            onClick={handleSaveChanges}
          >
            <FiSave size={20} />
            <span>Save Changes</span>
          </button>
        </div>
        <div className="w-full">
          <NotesContent
            allowEditing={true}
            content={notesContent}
            setContent={setNotesContent}
          />
        </div>
      </div>
    </div>
  );
};

export default EditNotes;