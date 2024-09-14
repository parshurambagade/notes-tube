import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import useNotes from "../../hooks/useNotes";
import { useEffect, useState } from "react";
import { Notes } from "../../types";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";

const ViewNotes = () => {

    const {notes} = useCurrentNotesContext();

// get notesid from url 
const {notesId} = useParams();

const {fetchNotes} = useNotes();

useEffect(() => {
  console.log("View Notes rendered!");
}, []);

useEffect(() => {
    if (notesId) {
        fetchNotes(notesId);
    }
}, [notesId]);


  if (!notes.content.length) {
    return;
  } else {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8  w-full ">
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

          <div className="flex gap-4 items-center mb-6">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
              <span><FaRegEdit size={20} /></span>
              <span>Edit Notes</span>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
              <span><Trash2 size={20} /></span>
              <span>Delete Notes</span>
              </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <NotesPage allowEditing={false} isSaved={true} />
        </div>
      </div>
    );
  }
};

export default ViewNotes;
