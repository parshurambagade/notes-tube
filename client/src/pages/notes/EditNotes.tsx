import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";
import useNotes from "../../hooks/useNotes";

const EditNotes = () => {
  const { notes } = useCurrentNotesContext();
  const { fetchNotes } = useNotes();
  const { notesId } = useParams();

  useEffect(() => {
    if (notesId) {
      fetchNotes(notesId);
    }
  }, [notesId]);

  if (!notes.content.length) {
    return;
  } else {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-12 w-full ">
        <div className="flex  justify-normal flex-col gap-0 mb-0 mx-28">
          <div className="flex items-center mb-6">
            <Link
              to={`/notes/${notesId}`}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <BsArrowLeft className="mr-2" size={20} />
              Back notes
            </Link>
          </div>

          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold">Editior Mode</h2>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <NotesPage allowEditing={true} isSaved={false} />
        </div>
      </div>
    );
  }
};

export default EditNotes;
