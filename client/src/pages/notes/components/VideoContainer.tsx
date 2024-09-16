import { YOUTUBE_IFRAME_URL } from "../../../constants";

const VideoContainer: React.FC<{videoId: string}> = ({videoId}) => {


  return (
    <div className="aspect-w-16 aspect-h-9  border-b-gray-800 bg-gray-800">
      <iframe
        className="w-full aspect-video"
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
