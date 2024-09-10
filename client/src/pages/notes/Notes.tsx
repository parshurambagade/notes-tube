import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // include styles
import "./NotesContainerStyles.css";

import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoDetailsContainer from "./components/VideoDetailsContainer.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";

const NotesPage: React.FC<{allowEdit?: boolean, isSaved?: boolean}> = ({allowEdit, isSaved}) => {

  const [error, setIsError] = useState<string>('');

  return (
    <div className="parent lg:px-0  pt-2 pb-8 w-full border-t-gray-800 h-max bg-gray-900">

      {error && <ErrorComponent />}
      
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
