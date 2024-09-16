import NotesCard from "./NotesCard";
import { Link, useNavigate } from "react-router-dom";
import useNotes from "../../../hooks/useNotes";
import { Notes } from "../../../types";

const NotesContainer: React.FC<{savedNotes: Notes[], setSavedNotes: React.Dispatch<React.SetStateAction<Notes[]>>}> = ({savedNotes, setSavedNotes}) => {

  const {loading, error, deleteNotes } = useNotes();


  const navigate = useNavigate();

  if (loading) {
    return <p className="text-gray-400 text-2xl">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-2xl">{error}</p>;
  }

  const handleDeleteClick = (notes: Notes) => {
    const notesId = notes._id;
    setSavedNotes(savedNotes.filter((notes) => notes._id !== notesId));
    deleteNotes(notes._id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedNotes.length ? (
        savedNotes.map((notes) => (
          <Link to={`/notes/${notes._id}`} key={notes._id}>
          <NotesCard
            key={notes._id}
            notes={notes}
            onEdit={() => { navigate(`/notes/edit/${notes._id}`)}}
            onDelete={() => handleDeleteClick(notes)}
          />
          </Link>
        ))
      ) : (
        <p className="text-gray-400 text-2xl">No notes found.</p>
      )}
    </div>
  );
};

export default NotesContainer;
