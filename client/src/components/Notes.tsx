import React, { useEffect, useState } from 'react'
import { useVideoContext } from '../contexts/videoContext'
import LoadingSpinner from './LoadingSpinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import '../NotesContainerStyles.css';
import { fetchVideoNotes } from '../helpers/videoHelpers';


const Notes: React.FC = () => {
  const {videoNotes, updateVideoNotes,combinedTranscript} = useVideoContext();

  useEffect(() => {
    // console.log( `Combined Transcript: ${combinedTranscript.length}`);
    if (combinedTranscript.length) {
      fetchVideoNotes({combinedTranscript, videoNotes, updateVideoNotes});
    }
  }, [combinedTranscript]);

  if (typeof videoNotes !== 'string') return <div className='text-red-500 font-bold text-2xl'>Something went wront!</div>;

  return ( 
    videoNotes.length > 0 ? 
    <div className="h-full overflow-y-scroll  max-w-full">
      <ReactQuill theme="snow" value={videoNotes} onChange={updateVideoNotes} className='pb-24' />
    </div>  
    : <LoadingSpinner content="Notes" />
    )
}

export default Notes