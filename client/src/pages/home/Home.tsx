import React, { useState } from "react";
import NotesPage from "../notes/NotesPage";
import { parseYouTubeInput } from "../../utils/youtubeUtils";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import GenerateNotesForm from "./components/GenerateNotesForm";
import useNotes from "../../hooks/useNotes";

const Home: React.FC = () => {
  const [allowEditing, setAllowEditing] = useState<boolean>(false);
  const { generateNotes, isGenerating } = useNotes();
  const { setVideoId, isSaved } = useCurrentNotesContext();

  const handleGenerate = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = parseYouTubeInput(videoUrl);
      if (typeof videoId === "string") {
        setVideoId(videoId);
        generateNotes(videoId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 md:p-8 pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4">
          YouTube Study Notes Generator
        </h1>
        <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Transform YouTube videos into concise, organized notes instantly.
        </p>

        <div className="w-full max-w-3xl mx-auto">
          <GenerateNotesForm
            onSubmit={handleGenerate}
            isGenerating={isGenerating}
          />

          {!isSaved && (
            <div className="mt-8">
              <NotesPage
                setAllowEditing={setAllowEditing}
                allowEditing={allowEditing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;