export const YOUTUBE_IFRAME_URL = "https://www.youtube.com/embed/";

export const FETCH_VIDEO_DETAILS = `https://www.googleapis.com/youtube/v3/videos?&part=snippet,contentDetails,statistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&id=`;