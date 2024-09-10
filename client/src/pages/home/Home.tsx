import { useState } from "react";
import ErrorComponent from "../notes/components/ErrorComponent";
import NotesPage from "../notes/Notes";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    // Simulating API call
    setTimeout(() => {
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        setNotes("Sample generated notes for Hoisting in JavaScript...");
        setIsGenerating(false);
      } else {
        setError("Unable to Generate Notes!");
        setIsGenerating(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
    <h1 className="text-4xl font-bold text-center mb-4">YouTube Study Notes Generator</h1>
    <p className="text-center text-gray-400 mb-8">Transform YouTube videos into concise, organized notes instantly.</p>
  
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
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
    </div>

        {/* TODO:SHOW GENERATE NOTES CONDITIONLY */}
        <NotesPage />
      </div>
    </div>
  );
};

export default Home;
