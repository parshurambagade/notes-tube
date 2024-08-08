import { YOUTUBE_IFRAME_URL } from '../constants';
import { useVideoContext } from '../contexts/videoContext';
import { convertDateToRelative, convertDuration } from '../utils/youtubeUtils';

const VideoDetailsContainer: React.FC = () => {
  const { videoId, videoDetails, videoNotes, transcript} = useVideoContext();

  if(!videoDetails) return;

  return (
    <div className="w-full flex flex-col items-center rounded-lg h-max pb-4">
        <div className="w-full  pb-3">
        <h5 className=" text-black font-black text-2xl">
              {videoDetails?.items[0]?.snippet?.title}
            </h5>
        </div>
        <div className="w-full flex items-center justify-center">
          <iframe
            className="h-[60vh] w-full"
            src={YOUTUBE_IFRAME_URL + videoId}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
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