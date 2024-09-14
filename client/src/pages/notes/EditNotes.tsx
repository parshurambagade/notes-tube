import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import useNotes from "../../hooks/useNotes";
import NotesContent from "./components/NotesContent";
import { FaRegEdit } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { API_ENDPOINT } from "../../constants";
import axios from "axios";

const EditNotes = () => {
  const { notes } = useCurrentNotesContext();
  const { fetchNotes } = useNotes();
  const { notesId } = useParams();
  const [notesContent, setNotesContent] = useState("");

  useEffect(() => {
    if (notesId) {
      fetchNotes(notesId);
    }
  }, [notesId]);

  useEffect(() => {
    if (notes.content) {
      setNotesContent(notes.content);
    }
  }, [notes]);


  const handleSaveChanges = async () => {
    try{
      if (notesContent.length && notesId) {
        const response = await axios.put(`${API_ENDPOINT}/notes/${notesId}`, {
          content: notesContent,
        }, {
          withCredentials: true,
        })

        console.log("Response in handleSaveChanges", response);

        if (response.status === 200) {
          fetchNotes(notesId);
          alert("Notes updated successfully");
        }
      }
    }catch(err){
      console.error(err);
    }
    

  }; 

  if (!notesContent.length) {
    return;
  } else {
    return (
      <div className="min-h-screen    bg-gray-900 text-gray-100 p-8  w-full ">
        <div className="flex max-w-4xl justify-between gap-0 mb-0 mx-auto">
          <div className="flex items-center mb-6">
            <Link
              to={`/dashboard`}
              className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <IoArrowBackSharp  className="mr-2" size={20} />
              Back to Dashboard
            </Link>
          </div>

          <div className="flex items-center mb-6">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2" onClick={handleSaveChanges}>
              <span><FiSave size={20} /></span>
              <span>Save Changes</span>
              </button>
          </div>
        </div>
        <div className="max-w-4xl w-full flex justify-center items-center mx-auto">
          {/* <NotesPage allowEditing={true} isSaved={false} /> */}
          <NotesContent allowEditing={true} content={notesContent} setContent={setNotesContent} />
        </div>
      </div>
    );
  }
};

export default EditNotes;
