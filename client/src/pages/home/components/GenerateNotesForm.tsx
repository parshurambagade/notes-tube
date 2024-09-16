import { useState } from "react";
import { INITIAL_VIDEO_URL } from "../../../constants";

interface GenerateNotesFormProps {
  onSubmit: (videoUrl: string) => void;
  isGenerating: boolean;
}

const GenerateNotesForm: React.FC<GenerateNotesFormProps> = ({
  onSubmit,
  isGenerating,
}) => {
  const [videoUrl, setVideoUrl] = useState<string>(INITIAL_VIDEO_URL);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(videoUrl);
    setVideoUrl("");
  };

  return (
    <form className="flex mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube video link here..."
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
  );
};

export default GenerateNotesForm;
