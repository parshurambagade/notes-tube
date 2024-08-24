import {useState } from "react";
import { parseYouTubeInput } from "../utils/youtubeUtils";
// import { useVideoContext } from "../contexts/videoContext.tsx";
// import { useNavigate } from "react-router-dom";
import GenerateNotes from "../components/GenerateNotes";
import { useCurrentNotesContext } from "../contexts/currentNotesContext";

const Home = () => {
  const [input, setInput] = useState<string>('');
  const [showGenerateNotes, setShowGenerateNotes] = useState<boolean>(false);


  const { 
    setVideoId, 
  } = useCurrentNotesContext();
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVideoId(parseYouTubeInput(input));
    setInput("");
    setShowGenerateNotes(true);
    // navigate('/generate-notes');
  };

  return (
    <div className={`flex flex-col items-center min-h-[90vh] w-full overflow-x-scroll ${showGenerateNotes ? 'pt-16' : 'pt-28'}`}>
      <div className={`flex flex-col gap-3 ${showGenerateNotes ? 'gap-1' : 'gap-3'}`}>
        <div className={`text-center flex flex-col ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}>
          <h2 className='text-3xl text-gray-900 font-medium'>YouTube Study Notes Generator</h2>
          <p className='text-base text-gray-800'>Transform YouTube videos into concise, organized notes instantly.</p>
        </div>
        <form onSubmit={handleFormSubmit} className='flex items-center border border-dotted border-blue-400 rounded-lg p-3 gap-3'>
          <input className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" type="text" name="video-link" value={input} onChange={handleInputChange} placeholder='Paste youtube video link here...' required={true} />
          <button type='submit' className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600" disabled={!input.length}>Generate</button>
        </form>       
      </div>
      {showGenerateNotes && <GenerateNotes />}

    </div>
  );
};

export default Home;
