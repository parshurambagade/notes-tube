import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // include styles
import "./NotesContainerStyles.css";

import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoContainer from "./components/VideoContainer.tsx";
import axios from "axios";
import { API_ENDPOINT } from "../../constants.ts";
import DOMPurify from "isomorphic-dompurify";
import { DUMMY_VIDEO_ID } from "../../utils/dummy-data.ts";

const NotesPage: React.FC<{allowEdit?: boolean, isSaved?: boolean, setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>, videoId?: string, notesContent?: string, title?: string}> = ({allowEdit, isSaved, setIsGenerating, videoId, notesContent, title}) => {


  return (
    <div className="parent lg:px-0  pt-2 pb-8 w-full border-t-gray-800 h-max bg-gray-900">
      
      {/* header of notes */}
      <NotesHeader isSaved={isSaved} title={title ? title : "Dummy Title"} />
      {/* VIDEO  */}
      <VideoContainer videoId={videoId ? videoId : DUMMY_VIDEO_ID} />

      {/* NOTES CONTENT  */}
      <NotesContent allowEdit={allowEdit} content={notesContent} />
    </div>
  );
};

export default NotesPage;
