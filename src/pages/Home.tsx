import { useState } from "react";
import NotesContainer from "../components/NotesContainer"
import { parseYouTubeInput } from "../utils/youtubeUtils"
import { useVideoContext } from "../contexts/videoContext";


const Home = () => {

  const [input, setInput] = useState<string>("");

  const {updateVideoId} = useVideoContext();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateVideoId(parseYouTubeInput(input));
  }

  return (
    <div className='flex flex-col items-center pt-28 min-h-[90vh] width-1/2 overflow-x-scroll'>
        <div className='flex flex-col gap-3'>
            <div className='text-center flex flex-col gap-3'>
                <h2 className='text-3xl text-gray-900 font-medium'>YouTube Study Notes Generator</h2>
                <p className='text-base text-gray-800'>Transform YouTube videos into concise, organized notes instantly.</p>
            </div>
            <form onSubmit={handleFormSubmit} className='flex items-center border border-dotted border-blue-400 rounded-lg p-3 gap-3'>
                <input className="w-full px-3 py-2 border rounded-lg border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500" type="text" name="video-link" value={input} onChange={handleInputChange} placeholder='paste youtube video link here...'/>
                <button type='submit' className="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">Generate</button>
            </form>
        </div>

        {/* NOTES CONTAINER  */}
        <NotesContainer />
    </div>
  )
}

export default Home