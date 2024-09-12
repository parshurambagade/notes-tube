import React, { useCallback, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // include styles
import "./NotesContainerStyles.css";

import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoContainer from "./components/VideoContainer.tsx";
import axios from "axios";
import { API_ENDPOINT } from "../../constants.ts";
import DOMPurify from "isomorphic-dompurify";
import { DUMMY_VIDEO_ID } from "../../utils/dummy-data.ts";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";

const NotesPage: React.FC<{setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>, setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>, allowEditing?: boolean, setError?: React.Dispatch<React.SetStateAction<boolean>>, error?: boolean}> = ({setIsGenerating, setAllowEditing, allowEditing, setError, error}) => {

  const {notes, isSaved, videoId, setNotes} = useCurrentNotesContext();

  if(!notes.content.length) return;

  {error && <ErrorComponent />}

  return (
    <div className="parent lg:px-0  pt-2 pb-8 w-full max-w-4xl border-t-gray-800 h-max bg-gray-900">
      
      {/* header of notes */}
      <NotesHeader isSaved={isSaved} title={notes?.title} setAllowEditing={setAllowEditing} allowEditing={allowEditing} />
      {/* VIDEO  */}
      <VideoContainer videoId={videoId ? videoId : DUMMY_VIDEO_ID} />

      {/* NOTES CONTENT  */}
      <NotesContent allowEditing={allowEditing && allowEditing } />
    </div>
  );
};

export default NotesPage;
