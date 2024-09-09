import { FaRegBookmark, FaRegEdit } from "react-icons/fa"
import { YOUTUBE_IFRAME_URL } from "../../../constants"
import SaveNotesPopup from "./SaveNotesPopup"
import SaveRequiredModal from "../../../components/modals/SaveRequiredModal"
import LoginRequiredModal from "../../../components/modals/LoginRequiredModal"
import { DUMMY_VIDEO_ID } from "../../../utils/dummy-data"

const VideoDetailsContainer: React.FC = () => {
  
  return (
    <div className="video">
        <iframe
          className="h-[60vh] w-full aspect-video"
          src={YOUTUBE_IFRAME_URL + DUMMY_VIDEO_ID} // TODO: add videoId here
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="YouTube video"
          sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
        ></iframe>
      </div>);
        {/* TODO: */}
        {/* {isPopupVisible && (
        <SaveNotesPopup
          onSave={() => {}}
          onClose={() => setIsPopupVisible(false)}
          videoTitle={"VIDEO TITLE"}
        />
      )} */}
{/* TODO:  */}
{/* <SaveRequiredModal
isOpen={isSavedModalOpen}
onClose={() => setIsSavedModalOpen(false)}
onSaveAndEdit={handleSaveAndEdit}
/> */}

{/* TODO: */}
{/* <LoginRequiredModal 
isOpen={isLoggedInModalOpen}
onClose={() => setIsLoggedInModalOpen(false)}
onLogin={handleLogin}
/> */}
}

export default VideoDetailsContainer