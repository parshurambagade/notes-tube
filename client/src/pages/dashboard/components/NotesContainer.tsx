import NotesCard from "./NotesCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";
import useNotes from "../../../hooks/useNotes";
import { useEffect } from "react";

const NotesContainer = () => {

  const { userId } = useAuthContext();

  const { savedNotes, loading, error,  fetchAllNotes } = useNotes();

  useEffect(() => {
    if (userId) {
      fetchAllNotes();
    }
  }, [userId])

  const navigate = useNavigate();

  if (loading) {
    return <p className="text-gray-400 text-2xl">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-2xl">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedNotes.length > 0 ? (
        savedNotes.map((notes) => (
          <Link to={`/notes/${notes._id}`} key={notes._id}>
          <NotesCard
            key={notes._id}
            notes={notes}
            onEdit={() => { navigate(`/notes/edit/${notes._id}`)}}
            onDelete={() => {}}
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
