import axios from 'axios';
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from '../constants';
import { useCurrentNotesContext } from '../contexts/currentNotesContext';
import { useAuthContext } from '../contexts/authContext';
import { useUserContext } from '../contexts/userContext';
import { UserContextType } from '../types';
import { MouseEvent, useState } from 'react';
import SaveNotesPopup from './SaveNotesPopup';


const VideoDetailsContainer: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const { videoId, videoTitle, notesContent, thumbnail, } = useCurrentNotesContext();
  const { user } = useUserContext() as UserContextType;
  const {userId} = useAuthContext() as {userId: string};

  //DUMMY SECTIONS FOR SAVE NOTES FUNCTION
  const sections = [{_id: '66b9ecf80f4ca829826f9d52', name: 'Work'}, {_id: '66b9ecf80f4ca829826f9d51', name: 'Personal'}, {_id: '66b9ecf80f4ca829826f9d50', name: 'Study'}];

  console.log(user);
  const handleSaveNotes  = async ({notesName,selectedSection}: {notesName: string, selectedSection: string}) => {
    // Backend : { title, thumbnail, content, videoId, createdBy, section }
    try{
    console.log(notesName,selectedSection);
    const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
    title: notesName, 
      thumbnail: thumbnail, 
      content: notesContent,
      videoId: videoId,
      createdBy: userId,
      section: selectedSection,
    })

    console.log(response.data);
    setIsPopupVisible(false);
    // alert(response.data.message);
  }catch(err){
    console.error(err);
  }

  }

if(!videoId || !videoTitle) return;

  return (
    <div className="w-full flex flex-col items-center rounded-lg h-max  pb-[.2rem]">
        <div className="w-full border px-4  py-2 flex justify-between   ">
        <h5 className=" text-black font-black text-2xl mt-1">
              {videoTitle}
            </h5>
            <button className="px-3 py-2 my-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600" disabled={!notesContent.length} onClick={() => setIsPopupVisible(true)}>
              Save Notes
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
          sections={sections}
          onSave={handleSaveNotes}
          onClose={() => setIsPopupVisible(false)}
          videoTitle={videoTitle}
        />
      )}
      </div>
  )
}

export default VideoDetailsContainer