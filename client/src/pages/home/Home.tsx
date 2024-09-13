import NotesPage from "../notes/Notes";
import { parseYouTubeInput } from "../../utils/youtubeUtils";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import { useState } from "react";
import GenerateNotesForm from "./components/GenerateNotesForm";
import useGenerateNotes from "../../hooks/useGenerateNotes";

const Home = () => {
  const [allowEditing, setAllowEditing] = useState<boolean>(false);
  const { generateNotes,setIsGenerating, isGenerating, error, setError } = useGenerateNotes();
  const { setVideoId } = useCurrentNotesContext();

  const handleGenerate = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = parseYouTubeInput(videoUrl);
      if (typeof videoId === "string") {
        setVideoId(videoId);
        generateNotes(videoId);
      }
    } else {
      setError(true);
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
        <GenerateNotesForm onSubmit={handleGenerate} isGenerating={isGenerating} />
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
