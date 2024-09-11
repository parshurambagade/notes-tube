import { FaRegBookmark, FaRegEdit } from "react-icons/fa"
import { YOUTUBE_IFRAME_URL } from "../../../constants"
import SaveNotesPopup from "./SaveNotesPopup"
import SaveRequiredModal from "../../../components/modals/SaveRequiredModal"
import LoginRequiredModal from "../../../components/modals/LoginRequiredModal"
import { DUMMY_VIDEO_ID } from "../../../utils/dummy-data"

const VideoContainer: React.FC<{videoId?: string}> = ({videoId}) => {
  
  return (
    <div className="aspect-w-16 aspect-h-9  border-b-gray-800 bg-gray-800">
              <iframe className='w-full aspect-video' src={YOUTUBE_IFRAME_URL + videoId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>)
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

export default VideoContainer