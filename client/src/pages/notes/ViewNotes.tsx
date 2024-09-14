import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import useNotes from "../../hooks/useNotes";
import { useEffect, useState } from "react";
import { Notes } from "../../types";

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
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-12 w-full ">
        <div className="flex items-center mb-6 mx-28">
          <a href="/dashboard" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <BsArrowLeft className="mr-2" size={20} />
            Back dashboard
          </a>
        </div>
        <div className="flex justify-center items-center">
        <NotesPage allowEditing={false} isSaved={true} />
        </div>
      </div>
    );
  }
};

export default ViewNotes;
