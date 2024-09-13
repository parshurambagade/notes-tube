import NotesCard from "./NotesCard";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";
import useFetchAllNotes from "../../../hooks/useFetchAllNotes";

const NotesContainer = () => {

  const { userId } = useAuthContext();

  const { savedNotes, loading, error } = useFetchAllNotes(userId);

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
          <NotesCard
            key={notes._id}
            notes={{ ...notes}}
            onEdit={() => navigate(`/notes/edit/${notes._id}`)}
            onDelete={() => {}}
          />
        ))
      ) : (
        <p className="text-gray-400 text-2xl">No notes found.</p>
      )}
    </div>
  );
};

export default NotesContainer;
