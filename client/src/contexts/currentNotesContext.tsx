import { createContext, useContext, useState } from "react";
import { CurrentNotesContextType, Notes } from "../types";

export const initialNotes = {
  _id: "", // MongoDB ObjectId as a string
  title: "",
  thumbnail: "",
  content: "",
  videoId: "",
  createdBy: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0, // Versio
};

const currentNotesContext = createContext<CurrentNotesContextType>({
  notes: initialNotes,
  setNotes: () => {},
  videoId: "",
  setVideoId: () => {},
  isSaved: false,
  setIsSaved: () => {},
});

export const useCurrentNotesContext = () => {
  return useContext(currentNotesContext);
};

export const CurrentNotesContextProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [notes, setNotes] = useState<Notes>(initialNotes);
  const [videoId, setVideoId] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  return (
    <currentNotesContext.Provider
      value={{ notes, setNotes, videoId, setVideoId, isSaved, setIsSaved }}
    >
      {children}
    </currentNotesContext.Provider>
  );
};
export default currentNotesContext;
