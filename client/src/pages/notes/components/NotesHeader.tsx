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
}> = ({ isSaved, title, setAllowEditing, allowEditing }) => {

  const {notes, setIsSaved} = useCurrentNotesContext();
  const {isAuthenticated, userId} = useAuthContext();
  const [loginRequiredModal, setLoginRequiredModal] = useState<boolean>(false);
  const [saveRequiredModal, setSaveRequiredModal] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/notes/edit/current`);
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

  const handleSaveNotes  = async () => {
     // Backend : { title, thumbnail, content, videoId, createdBy}
     try{
      
      if(!isAuthenticated) setLoginRequiredModal(true);
  
      const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
        ...notes,
        createdBy: userId,
      }, { withCredentials: true });
  
      console.log(`Response in handleSaveNotes`, JSON.stringify(response.data));
      setIsSaved(true);
      alert(response.data.message);
      navigate('/dashboard');
    }catch(err: any){
      console.error(err);
      alert(err.response.data.message);
      navigate('/dashboard');

    }
  
  }

  const handleView = () => {
    navigate('/');
  }
  return (
    <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
      <h2 className="text-xl font-semibold">{notes?.title}</h2>
      <div className="flex gap-2">
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
            onClick={handleView}
          >
            <VscOpenPreview size={20} />
          </button>
        ) : null}

        <button className="text-green-400 hover:text-green-300" onClick={handleSave}>
          <FiSave size={20} />
        </button>
      </div>

      <LoginRequiredModal 
isOpen={loginRequiredModal}
onClose={() => setLoginRequiredModal(false)}
onLogin={handleLogin}
/>

    </div>
  );
};

export default NotesHeader;
