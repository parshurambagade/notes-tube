import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // include styles
import "./NotesContainerStyles.css";

import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoDetailsContainer from "./components/VideoDetailsContainer.tsx";

const NotesPage: React.FC<{allowEdit?: boolean, isSaved?: boolean}> = ({allowEdit, isSaved}) => {

  return (
    <div className="parent lg:px-48 py-8 w-full  h-max bg-gray-900">
      {/* header of notes */}
      <NotesHeader isSaved={isSaved} />
      {/* VIDEO  */}
      <VideoDetailsContainer />

      {/* NOTES CONTENT  */}
      <NotesContent allowEdit={allowEdit} />
    </div>
  );
};

export default NotesPage;
