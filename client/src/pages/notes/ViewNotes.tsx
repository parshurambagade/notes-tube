import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";

const ViewNotes = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { notes, videoId } = useCurrentNotesContext();

  // get notesid from url
  const { notesId } = useParams();

  const { fetchNotes, deleteNotes } = useNotes();

  useEffect(() => {
    if (notesId) {
      fetchNotes(notesId);
    }
  }, [notesId, videoId]);

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
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex justify-center items-center">
        No notes found.
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8  w-full ">
        <div className="flex max-w-4xl justify-between gap-0 mb-3 mx-auto">
          <div className="flex items-center">
            <Link
              to={`/dashboard`}
              className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <IoArrowBackSharp className="mr-2" size={20} />
              Back to Dashboard
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              onClick={() => navigate(`/notes/edit/${notesId}`)}
            >
              <span>
                <FaRegEdit size={20} />
              </span>
              <span>Edit Notes</span>
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              onClick={handleDeleteClick}
            >
              <span>
                <Trash2 size={20} />
              </span>
              <span>Delete Notes</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <NotesPage allowEditing={false} isSaved={true} />
        </div>

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          noteTitle={notes.title}
        />
      </div>
    );
  }
};

export default ViewNotes;
