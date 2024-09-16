import "react-quill/dist/quill.snow.css"; // include styles
import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoContainer from "./components/VideoContainer.tsx";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";
import useNotes from "../../hooks/useNotes.ts";
import { useEffect, useState } from "react";
import { Notes } from "../../types.ts";

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

  if (notesData && !notesData.content) return;

  {
    error && <ErrorComponent />;
  }

  return (
    <div className="parent lg:px-0  pt-2 pb-8 w-full max-w-4xl border-t-gray-800 h-max bg-gray-900">
      {/* header of notes */}
      <NotesHeader
        isSaved={isSaved}
        title={notesData?.title}
        setAllowEditing={setAllowEditing}
        allowEditing={allowEditing}
      />
      {/* VIDEO  */}
      <VideoContainer videoId={notesVideo} />

      {/* NOTES CONTENT  */}
      <NotesContent
        allowEditing={allowEditing && allowEditing}
        content={notesData.content}
        setContent={() => {}}
      />
    </div>
  );
};

export default NotesPage;
