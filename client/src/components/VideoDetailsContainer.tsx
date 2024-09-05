import axios from 'axios';
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from '../constants';
import { useCurrentNotesContext } from '../contexts/currentNotesContext';
import { useAuthContext } from '../contexts/authContext';
import { User} from '../types';
import {useState } from 'react';
import SaveNotesPopup from './SaveNotesPopup';
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import SaveRequiredModal from './modals/SaveRequiredModal';
import LoginRequiredModal from './modals/LoginRequiredModal';


const VideoDetailsContainer: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggedInModalOpen, setIsLoggedInModalOpen] = useState(false)
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false)
  const { videoId, videoTitle, notesContent, thumbnail, isSaved, setIsSaved } = useCurrentNotesContext();
  const {userId, user} = useAuthContext() as {userId: string | null, user: User};

  const navigate = useNavigate();

  console.log(JSON.stringify(user));


  const handleEditClicked = () => {
    setIsSavedModalOpen(true);
  }

  const handleSaveAndEdit = () => {
    setIsSavedModalOpen(false);
  }

  const handleLogin = () => {
    setIsLoggedIn(true) //FIXME: 
    setIsLoggedInModalOpen(false);
  }
  const handleSaveNotes  = async ({notesName}: {notesName: string}) => {
    // Backend : { title, thumbnail, content, videoId, createdBy}
    try{
    console.log(notesName);
    
    if(!isLoggedIn) setIsLoggedInModalOpen(true);

    //TODO: write logic to delete notes if they are already saved. 
    
    if(isSaved){
      const response = await axios.delete(`${API_ENDPOINT}/${videoId}/${userId}`);
      console.log(response);
    }


    const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
    title: notesName, 
      thumbnail: thumbnail, 
      content: notesContent,
      videoId: videoId,
      createdBy: userId,
    })

    console.log(JSON.stringify(response.data));
    setIsSaved(true);
    setIsPopupVisible(false);
    // alert(response.data.message);
  }catch(err){
    console.error(err);
  }

  }


if(!videoId || !videoTitle) return;

  return (
    <div className="w-full flex flex-col items-center rounded-lg h-max bg-gray-800 pb-[.2rem]">
      {/* header of notes */}
      <div className="notes-header bg-gray-800 py-2 px-4 rounded-t-lg border-gray-600 w-full flex justify-between items-center">

        <div className="flex gap-2 items-center">
        <p className="text-gray-300 font-bold text-xl my-2">{videoTitle}</p>
        </div>

        {/* card buttons  */}
        <div className="flex flex-row-reverse w-max justify-between gap-4">
        <button onClick={() => handleSaveNotes(videoTitle)} className="flex items-center gap-1 text-xs px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            <span>
              <FaRegBookmark />
            </span>
            <span>Save</span>
          </button>
          <button onClick={() => handleEditClicked()} className="flex items-center gap-1 text-xs px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            <span>
              <FaRegEdit />
            </span>
            <span>Edit</span>
          </button>
        </div>
      </div>
        <div className="w-full flex items-center justify-center">
          <iframe
            className="h-[60vh] w-full"
            src={YOUTUBE_IFRAME_URL + videoId}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="YouTube video"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          ></iframe>
        </div>
        {isPopupVisible && (
        <SaveNotesPopup
          onSave={handleSaveNotes}
          onClose={() => setIsPopupVisible(false)}
          videoTitle={videoTitle}
        />
      )}

<SaveRequiredModal
isOpen={isSavedModalOpen}
onClose={() => setIsSavedModalOpen(false)}
onSaveAndEdit={handleSaveAndEdit}
/>

<LoginRequiredModal 
isOpen={isLoggedInModalOpen}
onClose={() => setIsLoggedInModalOpen(false)}
onLogin={handleLogin}
/>
      </div>
  )
}

export default VideoDetailsContainer