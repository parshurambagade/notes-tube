import axios from 'axios';
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from '../constants';
import { useCurrentNotesContext } from '../contexts/currentNotesContext';
import { useAuthContext } from '../contexts/authContext';
import { useUserContext } from '../contexts/userContext';
import { UserContextType } from '../types';


const VideoDetailsContainer: React.FC = () => {
  const { videoId, videoTitle, notesContent, thumbnail, } = useCurrentNotesContext();
  const { user } = useUserContext() as UserContextType;
  const {userId} = useAuthContext() as {userId: string};
  console.log(user);
  const handleSaveNotes = async () => {
    // Backend : { title, thumbnail, content, videoId, createdBy, section }

    const response = await axios.post(`${API_ENDPOINT}/notes/save`,{
      title: videoTitle,
      thumbnail: thumbnail,
      content: notesContent,
      videoId: videoId,
      createdBy: userId,
      section: user.sections[0],
    })

    console.log(response.data);
    alert(response.data.message);

  }

if(!videoId || !videoTitle) return;

  return (
    <div className="w-full flex flex-col items-center rounded-lg h-max  pb-[.2rem]">
        <div className="w-full border px-4  py-2 flex justify-between   ">
        <h5 className=" text-black font-black text-2xl mt-1">
              {videoTitle}
            </h5>
            <button className="px-3 py-2 my-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600" disabled={!notesContent.length} onClick={handleSaveNotes}>
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
        {/* <div className=" flex flex-col gap-4"> */}
          {/* <div className="mb-4"> */}
            
          {/* </div> */}
          {/* <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <span>Author</span>
              <span>{videoDetails?.items[0]?.snippet?.channelTitle}</span>
            </div>
            <div className="flex justify-between">
              <span>Video Length</span>
              <span>
                {convertDuration(
                  videoDetails?.items[0]?.contentDetails?.duration
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Published At</span>
              <span>
                {convertDateToRelative(
                  videoDetails?.items[0]?.snippet?.publishedAt
                )}
              </span>
            </div>
          </div> */}
        {/* </div> */}
      </div>
  )
}

export default VideoDetailsContainer