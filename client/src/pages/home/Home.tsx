import { useCallback, useContext, useEffect, useState } from "react";
import ErrorComponent from "../notes/components/ErrorComponent";
import NotesPage from "../notes/Notes";
import { parseYouTubeInput } from "../../utils/youtubeUtils";
import { fetchVideoNotes } from "../../helpers/videoHelpers";
import axios from "axios";
import { API_ENDPOINT, FETCH_VIDEO_DETAILS } from "../../constants";
import DOMPurify from "isomorphic-dompurify";
import {
  initialNotes,
  useCurrentNotesContext,
} from "../../contexts/currentNotesContext";
import { Notes } from "../../types";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [allowEditing, setAllowEditing] = useState<boolean>(false);

  const { notes, setNotes, videoId,setVideoId } = useCurrentNotesContext();

  const fetchNotes = useCallback(async (videoId: string) => {
    try {
      if (!videoId) return;
      setError && setError(false);
      setIsGenerating && setIsGenerating(true);
      const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
        videoId,
      });

      console.log(response.data);

      setIsGenerating && setIsGenerating(false);
      const sanitizedHTML = DOMPurify.sanitize(response?.data?.content);
      
      setNotes({
        content: sanitizedHTML,
        videoId,
        title: response?.data?.videoDetails?.snippet?.title,
        thumbnail:
          response?.data?.videoDetails?.snippet?.thumbnails?.medium?.url,
      });

    } catch (err) {
      setIsGenerating && setIsGenerating(false);
      setError && setError(true);
      console.error(err);
    }
  }, [API_ENDPOINT, setError, setIsGenerating, setNotes]);


  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsGenerating && setIsGenerating(true);
      setError(false);
      setVideoId("");
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        const videoId = parseYouTubeInput(videoUrl);
        if (typeof videoId === "string") {
          setVideoId(videoId);
          await fetchNotes(videoId);
        }
      } else {
        setError(true);
        setIsGenerating(false);
      }
      setVideoUrl("");
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
        <form className="flex mb-4" onSubmit={handleGenerate}>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste youtube video link here..."
            className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-md transition-colors duration-300 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </form>
        

        {/* TODO:SHOW GENERATE NOTES CONDITIONLY */}
        
          <NotesPage
            setIsGenerating={setIsGenerating}
            setAllowEditing={setAllowEditing}
            allowEditing={allowEditing}
            setError={setError}
            error={error}
          />
        
      </div>
    </div>
  );
};

export default Home;
