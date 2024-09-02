import axios from 'axios';
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from '../constants';
import { useCurrentNotesContext } from '../contexts/currentNotesContext';
import { useAuthContext } from '../contexts/authContext';
import { useUserContext } from '../contexts/userContext';
import { UserContextType } from '../types';
import { MouseEvent, useState } from 'react';
import SaveNotesPopup from './SaveNotesPopup';
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";


const VideoDetailsContainer: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { videoId, videoTitle, notesContent, thumbnail, isSaved, setIsSaved } = useCurrentNotesContext();
  const { user } = useUserContext() as UserContextType;
  const {userId} = useAuthContext() as {userId: string};


  console.log(JSON.stringify(user));
  const handleSaveNotes  = async ({notesName}: {notesName: string}) => {
    // Backend : { title, thumbnail, content, videoId, createdBy}
    try{
    console.log(notesName);

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
        <div className="w-full border rounded-t-lg border-gray-700 border-b-0 px-4  py-1 flex justify-between  items-center">
        <h5 className=" text-gray-300 font-black text-xl">
              {videoTitle}
            </h5>
            <button className="mx-2 text-base bg-gray-700 items-center  text-white flex gap-1  py-1 px-2 rounded-lg" disabled={!notesContent.length} onClick={() => setIsPopupVisible(true)}>
              <span>
              {!isSaved ? <FaRegBookmark /> : <FaBookmark className='text-white' />}  
              </span>
              <span>{!isSaved ? "Save" : "Saved"} </span>
            </button>
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
      </div>
  )
}

export default VideoDetailsContainer