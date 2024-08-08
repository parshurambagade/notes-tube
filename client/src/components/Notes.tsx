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
import VideoDetailsContainer from "./VideoDetailsContainer";

const Notes: React.FC<{ videoId: string }> = ({ videoId }) => {
  const { videoNotes, updateVideoNotes, combinedTranscript } =
    useVideoContext();

  useEffect(() => {
    // console.log( `Combined Transcript: ${combinedTranscript.length}`);
    // if (combinedTranscript.length) {
    // fetchVideoNotes({combinedTranscript, videoNotes, updateVideoNotes});
    // }

    const fetchNotes = async () => {
      try {
        updateVideoNotes("");
        const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
          videoId,
        });

        const sanitizedHTML = DOMPurify.sanitize(response?.data?.notes);
        updateVideoNotes(sanitizedHTML);
      } catch (err) {
        console.error(err);
      }
    };

    videoId && fetchNotes();
  }, [videoId]);

  if (typeof videoNotes !== "string")
    return (
      <div className="text-red-500 font-bold text-2xl">
        Something went wront!
      </div>
    );

  return videoNotes.length > 0 ? (
    <div className="h-full  max-w-full">
      <ReactQuill
        theme="snow"
        value={videoNotes}
        onChange={updateVideoNotes}
        readOnly={true} // Make the editor read-only
        modules={{ toolbar: false }} // Hide the toolbar
      />
    </div>
  ) : (
    <LoadingSpinner content="Notes" />
  );
};

export default Notes;
