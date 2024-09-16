import { useEffect, useState } from "react";
import { YOUTUBE_IFRAME_URL } from "../../../constants";
import { useCurrentNotesContext } from "../../../contexts/currentNotesContext";
import { BiStreetView } from "react-icons/bi";

const VideoContainer: React.FC = () => {
  const [video, setVideo] = useState<string>("");
  const {videoId} = useCurrentNotesContext();

  useEffect(() => {
    setVideo(videoId);
  }, [videoId]);

  return (
    <div className="aspect-w-16 aspect-h-9  border-b-gray-800 bg-gray-800">
      <iframe
        className="w-full aspect-video"
        src={YOUTUBE_IFRAME_URL + video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoContainer;
