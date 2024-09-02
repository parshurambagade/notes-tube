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
    <div className={`bg-gray-900 hide-scrollbar text-gray-300 flex flex-col items-center min-h-[90vh] w-full overflow-x-hidden ${showGenerateNotes ? 'pt-16' : 'pt-28'}`}>
      <div className={`flex flex-col gap-3 ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}>
        <div className={`text-center flex flex-col ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}>
          <h2 className='text-3xl  font-bold tracking-tight'>YouTube Study Notes Generator</h2>
          <p className='text-base text-gray-400'>Transform YouTube videos into concise, organized notes instantly.</p>
        </div>
        <form onSubmit={handleFormSubmit} className='flex items-center border border-dotted border-gray-600 rounded-lg p-3 gap-3'>
          <input className="w-full px-3 py-2 border text-sm rounded-lg border-gray-700 bg-gray-800 outline-none focus:outline-none" type="text" name="video-link" value={input} onChange={handleInputChange} placeholder='Paste youtube video link here...' required={true} />
          <button type='submit' className="px-[.6rem] py-[.4rem] rounded-lg border-gray-800 border text-gray-900 bg-gray-100 hover:bg-gray-300 text-sm hover:text-gray-800 hover:cursor-pointer hover:" disabled={!input.length}>Generate</button>
        </form>       
      </div>
      {showGenerateNotes && <GenerateNotes />}

    </div>
  );
};

export default Home;
