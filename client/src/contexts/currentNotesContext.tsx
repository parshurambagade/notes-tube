import { createContext, useContext, useEffect, useState } from "react";
import { CurrentNotesContextType, Notes } from "../types";
import { API_ENDPOINT } from "../constants";
import AuthContext, { useAuthContext } from "./authContext";
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
}

const currentNotesContext = createContext<CurrentNotesContextType>({notes: initialNotes, setNotes: () => {}, videoId:"", setVideoId: () => {}, isSaved: false, setIsSaved: () => {}});

export const useCurrentNotesContext = () => {
    return useContext(currentNotesContext);
};

export const CurrentNotesContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [notes, setNotes] = useState<Notes>(initialNotes);
  const [videoId, setVideoId] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

    const { userId } = useAuthContext()!;

    // useEffect(() => {
    //     // check if the notes are already saved or not
    //     checkIsSaved();

    // }, [notes?.videoId])

    //TODO: Complete the checkIsSaved function to check if the notes are already saved by the user or not
    
    // const checkIsSaved = async () => {
    //     const response = await axios.get(`${API_ENDPOINT}/notes/${videoId}/${userId}`);
    // }

    return (
        <currentNotesContext.Provider
            value={{notes, setNotes, videoId, setVideoId, isSaved, setIsSaved}}
        >
            {children}
        </currentNotesContext.Provider>
    );

};
export default currentNotesContext; 