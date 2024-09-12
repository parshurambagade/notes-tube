import React from "react";
import NotesPage from "./Notes";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { redirect, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const EditNotes = () => {
  const navigate = useNavigate();
  const { notes } = useCurrentNotesContext();

  if (!notes.content.length) {
    navigate("/");
    return;
  } else {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-12 w-full ">
        <div className="flex items-center mb-6 mx-28">
          <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <BsArrowLeft className="mr-2" size={20} />
            Back home
          </a>
        </div>
        <div className="flex justify-center items-center">
        <NotesPage allowEditing={true} />
        </div>
      </div>
    );
  }
};

export default EditNotes;
