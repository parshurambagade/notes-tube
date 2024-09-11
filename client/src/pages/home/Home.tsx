import { useEffect, useState } from "react";
import ErrorComponent from "../notes/components/ErrorComponent";
import NotesPage from "../notes/Notes";
import { parseYouTubeInput } from "../../utils/youtubeUtils";
import { fetchVideoNotes } from "../../helpers/videoHelpers";
import axios from "axios";
import { API_ENDPOINT, FETCH_VIDEO_DETAILS } from "../../constants";
import DOMPurify from "isomorphic-dompurify";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [notesContent, setNotesContent] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    videoId && fetchNotes(videoId);
  }, [videoId]);

  useEffect(() => {
    console.log(`Title: ${title}, Thumbnail: ${thumbnail}`);
  }, [title, thumbnail])
  const fetchNotes = async (videoId: string) => {
    try {
      if (!videoId) return;
      setError(false);
      setIsGenerating && setIsGenerating(true);
      setNotesContent("");
      const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
        videoId,
      });

      console.log(response.data);

      

      setIsGenerating && setIsGenerating(false);
      const sanitizedHTML = DOMPurify.sanitize(response?.data?.content);
      setTitle(response?.data?.videoDetails?.snippet?.title);
      setThumbnail(response?.data?.videoDetails?.snippet?.thumbnails?.medium?.url);
      setNotesContent(sanitizedHTML);
    } catch (err) {
      setIsGenerating && setIsGenerating(false);
      setError(true);
      console.error(err);
    }
  };

  // const fetchVideoDetails = async () => {
  //   try {
  //     setNotesContent("");
  //     setThumbnail("");
  //     setTitle("");
  //     const data = await fetch(FETCH_VIDEO_DETAILS + videoId);
  //     const json = await data.json();
  //     console.log(json);
  //     setTitle(json?.items[0]?.snippet?.title);
  //     setThumbnail(json?.items[0]?.snippet?.thumbnails?.medium?.url);
  //   } catch (err) {
  //     setError(true);
  //     console.error(err);
  //   }
  // };
  const handleGenerate = async () => {
    try {
      setIsGenerating && setIsGenerating(true);
      setError(false);
      setVideoId("");
      setNotesContent("");
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        const videoId = parseYouTubeInput(videoUrl);
        if (typeof videoId === "string") setVideoId(videoId);
      } else {
        setError(true);
        setIsGenerating(false);
      }
    } catch (err) {
      setError(true);

      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
      <h1 className="text-4xl font-bold text-center mb-4">
        YouTube Study Notes Generator
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Transform YouTube videos into concise, organized notes instantly.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="flex mb-4">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste youtube video link here..."
            className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-md transition-colors duration-300 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
        {error && <ErrorComponent />}

        {/* TODO:SHOW GENERATE NOTES CONDITIONLY */}
        {notesContent && (
          <NotesPage
            setIsGenerating={setIsGenerating}
            notesContent={notesContent}
            videoId={videoId}
            title={title}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
