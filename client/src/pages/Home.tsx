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
    <div className={`bg-zinc-900 hide-scrollbar text-zinc-300 flex flex-col items-center min-h-[90vh] w-full overflow-x-hidden ${showGenerateNotes ? 'pt-16' : 'pt-28'}`}>
      <div className={`flex flex-col gap-3 ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}>
        <div className={`text-center flex flex-col ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}>
          <h2 className='text-3xl  font-bold tracking-tight'>YouTube Study Notes Generator</h2>
          <p className='text-base text-zinc-400'>Transform YouTube videos into concise, organized notes instantly.</p>
        </div>
        <form onSubmit={handleFormSubmit} className='flex items-center border border-dotted border-zinc-600 rounded-lg p-3 gap-3'>
          <input className="w-full px-3 py-2 border rounded-lg border-zinc-700 bg-zinc-800 outline-none focus:outline-none" type="text" name="video-link" value={input} onChange={handleInputChange} placeholder='Paste youtube video link here...' required={true} />
          <button type='submit' className="px-4 py-2 rounded-lg border-zinc-800 border text-zinc-900 bg-zinc-100 hover:bg-zinc-300 hover:text-zinc-800 hover:cursor-pointer hover:" disabled={!input.length}>Generate</button>
        </form>       
      </div>
      {showGenerateNotes && <GenerateNotes />}

    </div>
  );
};

export default Home;
