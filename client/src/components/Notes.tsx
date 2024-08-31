import React, { useEffect, useState } from "react";
import { useVideoContext } from "../contexts/videoContext";
import LoadingSpinner from "./LoadingSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // include styles
import "../NotesContainerStyles.css";
import { fetchVideoNotes } from "../helpers/videoHelpers";
import axios from "axios";
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from "../constants";
import DOMPurify from 'isomorphic-dompurify';
import { useCurrentNotesContext } from "../contexts/currentNotesContext";

const Notes: React.FC<{videoId: string, errorState: {isError: boolean, setIsError: React.Dispatch<React.SetStateAction<boolean>>}}> = ({videoId, errorState}) => {

    const {setVideoTitle, notesContent, setNotesContent, setThumbnail} = useCurrentNotesContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {isError, setIsError} = errorState;


  useEffect(() => {
    fetchNotes();
  }, [videoId]);

  const fetchNotes = async () => {
    try {
      if(!videoId.length) return;
      setIsError(false);
      setIsLoading(true);
      setThumbnail("");
      setVideoTitle("");
      setNotesContent("");
      const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
        videoId,
      });
      const sanitizedHTML = DOMPurify.sanitize(response?.data?.content);
      setNotesContent(sanitizedHTML);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.error(err);
    }
  };

  
  if(notesContent.length > 0) {
    return (
    <div className="h-full bg-zinc-900 border-zinc-600 max-w-full">
      <ReactQuill
        theme="snow"
        value={notesContent}
        onChange={setNotesContent}
        readOnly={true} // Make the editor read-only
        style={{border:"none"}}
        modules={{ toolbar: false }} // Hide the toolbar
      />
    </div>
    );
  }else{
    return isLoading ? (
    <LoadingSpinner content="Notes" /> 
  ) : (
    <div className="text-center">
      <h2 className="text-red-500 font-black text-2xl">Notes can't be generated!!!</h2>
      <ul>
        <li className="text-gray-800 text-base">Video should be in English language.</li>
        <li className="text-gray-800 text-base">Video should not be more than 40 minutes.</li>
      </ul>
    </div>
  )
  }
};  

export default Notes;
