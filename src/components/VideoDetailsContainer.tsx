import { YOUTUBE_IFRAME_URL } from '../constants';
import { useVideoContext } from '../contexts/videoContext';
import { convertDateToRelative, convertDuration } from '../utils/youtubeUtils';

const VideoDetailsContainer: React.FC = () => {
  const { videoId, videoDetails, videoNotes, transcript} = useVideoContext();

  if(!videoDetails) return;

  return (
    <div className="w-1/3 border shadow-md rounded-lg h-max pb-8">
        <div className="bg-slate-100 py-2  text-center">
          <p>YouTube Video</p>
        </div>
        <div className="w-full p-6">
          <iframe
            className="w-full aspect-video"
            src={YOUTUBE_IFRAME_URL + videoId}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="px-6 flex flex-col gap-4">
          <div className="mb-4">
            <h5 className="font-bold text-lg">
              {videoDetails?.items[0]?.snippet?.title}
            </h5>
          </div>
          <div className="flex flex-col gap-8">
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
          </div>
        </div>
      </div>
  )
}

export default VideoDetailsContainer