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

const Notes: React.FC<{videoId: string}> = ({videoId}) => {

    const {setVideoTitle, notesContent, setNotesContent, setThumbnail} = useCurrentNotesContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    fetchNotes();
  }, [videoId]);

  const fetchNotes = async () => {
    try {
      if(!videoId.length) return;
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
      console.error(err);
    }
  };

  if (typeof notesContent !== "string")
    return (
      <div className="text-red-500 font-bold text-2xl">
        Something went wront!
      </div>
    );

  if(notesContent.length > 0) {
    return (
    <div className="h-full  max-w-full">
      <ReactQuill
        theme="snow"
        value={notesContent}
        onChange={setNotesContent}
        readOnly={true} // Make the editor read-only
        modules={{ toolbar: false }} // Hide the toolbar
      />
    </div>
    );
  }else{
    return isLoading ? (
    <LoadingSpinner content="Notes"  /> 
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
