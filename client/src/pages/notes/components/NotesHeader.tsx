import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import { VscOpenPreview } from "react-icons/vsc";
import { useCurrentNotesContext } from "../../../contexts/currentNotesContext";
import { useAuthContext } from "../../../contexts/authContext";
import LoginRequiredModal from "../../../components/modals/LoginRequiredModal";
import SaveRequiredModal from "../../../components/modals/SaveRequiredModal";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";

interface NotesHeaderProps {
  isSaved?: boolean;
  title: string;
  setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  allowEditing?: boolean;
}

const NotesHeader: React.FC<NotesHeaderProps> = ({ isSaved, setAllowEditing, allowEditing }) => {
  const { notes, setIsSaved, setVideoId } = useCurrentNotesContext();
  const { isAuthenticated } = useAuthContext();
  const [loginRequiredModal, setLoginRequiredModal] = useState<boolean>(false);
  const [saveRequiredModal, setSaveRequiredModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (isAuthenticated) {
      if (isSaved) {
        setAllowEditing && setAllowEditing(true);
        navigate(`/notes/edit/${notes._id}`);
      } else {
        setSaveRequiredModal(true);
      }
    } else {
      setLoginRequiredModal(true);
    }
  };

  const handleLogin = () => {
    setLoginRequiredModal(false);
    navigate("/login");
  };

  const handleSave = () => {
    if (isAuthenticated) {
      handleSaveNotes();
    } else {
      setLoginRequiredModal(true);
    }
  };

  const handleSaveNotes = async () => {
    try {
      if (!isAuthenticated) setLoginRequiredModal(true);

      const response = await axios.post(
        `${API_ENDPOINT}/notes/save`,
        {
          title: notes.title,
          thumbnail: notes.thumbnail,
          content: notes.content,
          videoId: notes.videoId,
        },
        { withCredentials: true }
      );

      setIsSaved(true);
      setVideoId(notes.videoId);
      alert(response.data.message);
      navigate(`/notes/${notes._id}`);
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message);
      navigate(`/notes/${err.response.data.notesId}`);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 px-4 sm:px-6 py-4 rounded-t-lg`}>
      <div className="w-full sm:w-auto md:my-4 lg:my-2 sm:mb-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-left">{notes.title}</h1>
        {isSaved && (
          <div className="hidden mg:flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-400 mt-2">
            <span>Created: {notes.createdAt && new Date(notes.createdAt).toLocaleString()}</span>
            <span className="mt-1 sm:mt-0 sm:ml-4">Updated: {notes.updatedAt && new Date(notes.updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>
      <div className={` ${isSaved ? " hidden " : "flex items-center mt-2 justify-end w-full lg:justify-normal gap-4 lg:gap-2 text-xl lg:text-2xl"}`}>
        {!allowEditing ? (
          <button className="text-blue-400 hover:text-blue-300 mr-2" onClick={handleEdit}>
            <FaRegEdit />
          </button>
        ) : !isAuthenticated ? (
          <button className="text-blue-400 hover:text-blue-300 mr-2" onClick={() => navigate(`/notes/${notes._id}`)}>
            <VscOpenPreview />
          </button>
        ) : null}
        {!isSaved ? (
          <button className="text-green-400 hover:text-green-300" onClick={handleSave}>
            <FiSave />
          </button>
        ) : (
          <button className="text-red-400 hover:text-red-300">
            <RiDeleteBin6Line />
          </button>
        )}
      </div>

      <LoginRequiredModal
        isOpen={loginRequiredModal}
        onClose={() => setLoginRequiredModal(false)}
        onLogin={handleLogin}
      />

      <SaveRequiredModal
        isOpen={saveRequiredModal}
        onClose={() => setSaveRequiredModal(false)}
        onSaveAndEdit={handleSaveNotes}
      />
    </div>
  );
};

export default NotesHeader;