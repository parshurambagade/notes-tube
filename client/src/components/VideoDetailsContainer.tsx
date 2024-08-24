import axios from 'axios';
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from '../constants';
import { useCurrentNotesContext } from '../contexts/currentNotesContext';
import { useAuthContext } from '../contexts/authContext';
import { useUserContext } from '../contexts/userContext';
import { UserContextType } from '../types';
import { MouseEvent, useState } from 'react';
import SaveNotesPopup from './SaveNotesPopup';
import { FaRegStar, FaStar } from "react-icons/fa";


const VideoDetailsContainer: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { videoId, videoTitle, notesContent, thumbnail, } = useCurrentNotesContext();
  const { user } = useUserContext() as UserContextType;
  const {userId} = useAuthContext() as {userId: string};


  console.log(JSON.stringify(user));
  const handleSaveNotes  = async ({notesName}: {notesName: string}) => {
    // Backend : { title, thumbnail, content, videoId, createdBy}
    try{
    console.log(notesName);
    const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
    title: notesName, 
      thumbnail: thumbnail, 
      content: notesContent,
      videoId: videoId,
      createdBy: userId,
    })

    console.log(JSON.stringify(response.data));
    setIsPopupVisible(false);
    // alert(response.data.message);
  }catch(err){
    console.error(err);
  }

  }

if(!videoId || !videoTitle) return;

  return (
    <div className="w-full flex flex-col items-center rounded-lg h-max  pb-[.2rem]">
        <div className="w-full border px-4  py-1 flex justify-between  items-center">
        <h5 className=" text-black font-black text-xl mt-1">
              {videoTitle}
            </h5>
            <button className="mx-2 text-2xl text-yellow-400 font-thin" disabled={!notesContent.length} onClick={() => setIsPopupVisible(true)}>
            <FaRegStar />

            <FaStar className='text-yellow-400' />
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