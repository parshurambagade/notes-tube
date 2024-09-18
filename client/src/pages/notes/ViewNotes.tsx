import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import NotesPage from "./NotesPage";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import useNotes from "../../hooks/useNotes";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";

const ViewNotes: React.FC = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { notes, videoId } = useCurrentNotesContext();
  const { notesId } = useParams<{ notesId: string }>();
  const { fetchNotes, deleteNotes } = useNotes();

  useEffect(() => {
    if (notesId) {
      fetchNotes(notesId);
    }
  }, []);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (notesId) {
      try {
        await deleteNotes(notesId);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  if (!notes || !notes.content || notes.content.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 flex justify-center items-center">
        No notes found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 pb-6  sm:px-6 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center my-2 md:my-4 lg:mb-6 md:gap-4">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors text-sm sm:text-base"
          >
            <IoArrowBackSharp className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <div className="flex gap-4">
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base"
              onClick={() => navigate(`/notes/edit/${notesId}`)}
            >
              <FaRegEdit className="text-base md:text-lg" />
              <span className="hidden sm:inline">Edit Notes</span>
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base"
              onClick={handleDeleteClick}
            >
              <FaRegTrashAlt className="text-base md:text-lg" />
              <span className="hidden sm:inline">Delete Notes</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <NotesPage allowEditing={false} isSaved={true} />
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ViewNotes;