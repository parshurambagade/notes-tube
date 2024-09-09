import NotesError from "../notes/components/NotesError";
import NotesPage from "../notes/Notes";
import GenerateNotes from "./components/GenerateNotes";

const Home = () => {

  return (
    <div className={`bg-gray-900 hide-scrollbar text-gray-300 flex flex-col items-center min-h-[90vh] w-full overflow-x-hidden pt-28`}>
      {/* <div className={`bg-gray-900 hide-scrollbar text-gray-300 flex flex-col items-center min-h-[90vh] w-full overflow-x-hidden ${showGenerateNotes ? 'pt-16' : 'pt-28'}`}></div> */}

      {/* <div className={`flex flex-col gap-3 ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}> */}
      <div className={`flex flex-col gap-3`}>

        {/* <div className={`text-center flex flex-col ${showGenerateNotes ? 'gap-1' : 'gap-3'} `}> */}
        <div className={`text-center flex flex-col gap-3 `}>
          <h2 className='text-3xl  font-bold tracking-tight'>YouTube Study Notes Generator</h2>
          <p className='text-base text-gray-400'>Transform YouTube videos into concise, organized notes instantly.</p>
        </div>
        <form onSubmit={() => {}} className='flex items-center border border-dotted border-gray-600 rounded-lg p-3 gap-3'>
          <input className="w-full px-3 py-2 border text-sm rounded-lg border-gray-700 bg-gray-800 outline-none focus:outline-none" type="text" name="video-link" placeholder='Paste youtube video link here...' required={true} />
          <button type='submit' className="px-[.6rem] py-[.4rem] rounded-lg border-gray-800 border text-gray-200 bg-purple-600 hover:bg-purple-700 text-sm  hover:cursor-pointer hover:" >Generate</button> 
          {/* TODO: disabled={!input.length} */}
        </form>       
      </div>

      <NotesError />
      {/* TODO:SHOW GENERATE NOTES CONDITIONLY */}
      <NotesPage /> 
    </div>
  );
};

export default Home;
