import React from "react";
import { YOUTUBE_IFRAME_URL } from "../../../constants";

interface VideoContainerProps {
  videoId: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({ videoId }) => {
  if (!videoId) return null;
  
  return (
    <div className="aspect-w-16 aspect-h-9 bg-gray-800 mb-4">
      <iframe
        className="w-full h-full"
        src={YOUTUBE_IFRAME_URL + videoId}
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