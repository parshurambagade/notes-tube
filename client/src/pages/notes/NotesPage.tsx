import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import NotesHeader from "./components/NotesHeader";
import NotesContent from "./components/NotesContent";
import VideoContainer from "./components/VideoContainer";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext";
import ErrorComponent from "./components/ErrorComponent";
import useNotes from "../../hooks/useNotes";
import { Notes } from "../../types";

interface NotesPageTypes {
  setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  allowEditing?: boolean;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  isSaved?: boolean;
}

const NotesPage: React.FC<NotesPageTypes> = ({
  setAllowEditing,
  allowEditing,
  isSaved,
}) => {
  const [notesData, setNotesData] = useState<Notes>({} as Notes);
  const [notesVideo, setNotesVideo] = useState<string>("");

  const { notes, videoId } = useCurrentNotesContext();
  const { error } = useNotes();

  useEffect(() => {
    if (notes) {
      setNotesData(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (videoId) {
      setNotesVideo(videoId);
    }
  }, [videoId]);

  if (notesData && !notesData.content) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 pt-2 md:pb-4 lg:pb-8">
      {error && <ErrorComponent />}
      <div className="px-0">
        <NotesHeader
          isSaved={isSaved}
          title={notesData?.title}
          setAllowEditing={setAllowEditing}
          allowEditing={allowEditing}
        />
        <VideoContainer videoId={notesVideo} />
        <NotesContent
          allowEditing={allowEditing}
          content={notesData.content}
          setContent={() => {}}
        />
      </div>
    </div>
  );
};

export default NotesPage;