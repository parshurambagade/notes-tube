import { DUMMY_NOTES_TITLE } from "../../../utils/dummy-data";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import { useCurrentNotesContext } from "../../../contexts/currentNotesContext";
import { GrFormViewHide } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";
import LoginRequiredModal from "../../../components/modals/LoginRequiredModal";
import { useState } from "react";
import { useAuthContext } from "../../../contexts/authContext";
import SaveRequiredModal from "../../../components/modals/SaveRequiredModal";
import SaveNotesPopup from "./SaveNotesPopup";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";

const NotesHeader: React.FC<{
  isSaved?: boolean;
  title: string;
  setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  allowEditing?: boolean;
}> = ({ title,isSaved, setAllowEditing, allowEditing }) => {

  const {notes, setIsSaved, setVideoId} = useCurrentNotesContext();
  const {isAuthenticated, userId} = useAuthContext();
  const [loginRequiredModal, setLoginRequiredModal] = useState<boolean>(false);
  const [saveRequiredModal, setSaveRequiredModal] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const handleEdit = () => {
    if(isAuthenticated) {
      if(isSaved) {
        setAllowEditing && setAllowEditing(true)
        navigate(`/notes/edit/${notes._id}`);
      }else{
        setSaveRequiredModal(true);
      }
    
    }else{
      setLoginRequiredModal(true);
    }
  }
  const handleLogin = () => {
    setLoginRequiredModal(false);
    navigate('/login');
  }

  const handleSave = () => {
    if(isAuthenticated){
      //TODO:

      handleSaveNotes();
    }else{
      setLoginRequiredModal(true);
    }
  }

  const handleUpdate = () => {
    setSaveRequiredModal(false);
  }

  const handleDelete = () => {

  }



  const handleSaveNotes  = async () => {
     // Backend : { title, thumbnail, content, videoId, createdBy}
     try{
      console.log("Notes in handleSaveNotes", notes);
      if(!isAuthenticated) setLoginRequiredModal(true);
  
      const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
        title: notes.title,
        thumbnail: notes.thumbnail,
        content: notes.content,
        videoId: notes.videoId,
      }, { withCredentials: true });
  
      console.log(`Response in handleSaveNotes`, JSON.stringify(response.data));
      setIsSaved(true);
      setVideoId(notes.videoId);
      alert(response.data.message);
      navigate(`/dashboard`);
    }catch(err: any){
      console.error(err);
      alert(err.response.data.message);
      navigate('/dashboard');

    }
  
  }

  return (
    <div className={`flex ${isSaved ? ' flex-col items-start justify-normal' : ''} justify-between items-center bg-gray-700 px-6 py-4 rounded-t-lg`}>
      <h1 className="text-3xl font-bold mb-3 mt-1 text-left w-full">{notes.title}</h1>
      <div className={`${!isSaved ? 'hidden ' : ''} w-full flex justify-between items-center text-sm text-gray-400 mb-0`}>
      <span>Created: {notes.createdAt && new Date(notes.createdAt).toLocaleString()}</span>
      <span>Updated: {notes.updatedAt && new Date(notes.updatedAt).toLocaleString()}</span>
      </div>
      <div className={`flex gap-2 ${isSaved ? ' hidden' : ''}`}>
        {!allowEditing ? (
          <button
            className="text-blue-400 hover:text-blue-300 mr-2"
            onClick={handleEdit}
          >
            <FaRegEdit size={20} />
          </button>
        ) : !isAuthenticated ?(
          <button
            className="text-blue-400 hover:text-blue-300 mr-2"
            onClick={() => navigate(`/notes/${notes._id}`)}
          >
            <VscOpenPreview size={20} />
          </button>
        ) : null}
        {!isSaved ?
        <button className="text-green-400 hover:text-green-300" onClick={handleSave}>
          <FiSave size={20} />
        </button> : 
        <button className="text-red-400 hover:text-red-300" onClick={handleDelete}>
          <RiDeleteBin6Line size={20} />
        </button>}
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
