import { createContext, useContext, useEffect, useState } from "react";
import { CurrentNotesContextType, Notes } from "../types";
import { API_ENDPOINT } from "../constants";
import { useAuthContext } from "./authContext";
import axios from "axios";

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

  const { userId } = useAuthContext()!;

  useEffect(() => {
    if (!userId) return;
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/notes/${userId}`, {
          withCredentials: true,
        });
        setNotes(response.data);
        setVideoId(response.data.videoId);
        setIsSaved(true);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, [userId]);

  return (
    <currentNotesContext.Provider
      value={{ notes, setNotes, videoId, setVideoId, isSaved, setIsSaved }}
    >
      {children}
    </currentNotesContext.Provider>
  );
};
export default currentNotesContext;
