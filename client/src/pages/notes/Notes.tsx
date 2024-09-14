import "react-quill/dist/quill.snow.css"; // include styles
import "./NotesContainerStyles.css";
import NotesHeader from "./components/NotesHeader.tsx";
import NotesContent from "./components/NotesContent.tsx";
import VideoContainer from "./components/VideoContainer.tsx";
import { DUMMY_VIDEO_ID } from "../../utils/dummy-data.ts";
import { useCurrentNotesContext } from "../../contexts/currentNotesContext.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";
import useNotes from "../../hooks/useNotes.ts";

interface NotesPageTypes {
  setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>; 
  setAllowEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  allowEditing?: boolean; 
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  isSaved?: boolean;
}
const NotesPage: React.FC<NotesPageTypes> = ({setAllowEditing, allowEditing, isSaved}) => {

  const {notes, videoId} = useCurrentNotesContext();

  const {error} = useNotes();

  if(!notes.content.length) return;

  {error && <ErrorComponent />}

  return (
    <div className="parent lg:px-0  pt-2 pb-8 w-full max-w-4xl border-t-gray-800 h-max bg-gray-900">
      
      {/* header of notes */}
      <NotesHeader isSaved={isSaved} title={notes?.title} setAllowEditing={setAllowEditing} allowEditing={allowEditing} />
      {/* VIDEO  */}
      <VideoContainer videoId={videoId} />

      {/* NOTES CONTENT  */}
      <NotesContent allowEditing={allowEditing && allowEditing } content={notes.content} setContent={() => {}}/>
    </div>
  );
};

export default NotesPage;
