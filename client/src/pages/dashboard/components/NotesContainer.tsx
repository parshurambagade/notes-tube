import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotesCard from "./NotesCard";
import useNotes from "../../../hooks/useNotes";
import { Notes } from "../../../types";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";
import { useUserContext } from "../../../contexts/userContext";

const NotesContainer: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Notes | null>(null);
  const { loading, error, deleteNotes } = useNotes();

  const { savedNotes, setSavedNotes } = useUserContext();
  
  const navigate = useNavigate();

  if (loading) {
    return <p className="text-gray-400 text-xl sm:text-2xl">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl sm:text-2xl">{error}</p>;
  }

  const handleDeleteClick = (notes: Notes) => {
    setNoteToDelete(notes);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      setSavedNotes(savedNotes.filter((notes) => notes._id !== noteToDelete._id));
      deleteNotes(noteToDelete._id);
    }
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {savedNotes ? (
        savedNotes.map((notes) => (
          <Link to={`/notes/${notes._id}`} key={notes._id} className="block">
            <NotesCard
              notes={notes}
              onEdit={() => {
                navigate(`/notes/edit/${notes._id}`);
              }}
              onDelete={() => handleDeleteClick(notes)}
            />
          </Link>
        ))
      ) : (
        <p className="text-gray-400 text-xl sm:text-2xl col-span-full">No notes found.</p>
      )}

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default NotesContainer;