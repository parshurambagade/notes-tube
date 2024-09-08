import { createContext, useContext, useEffect, useState } from "react";
import { CurrentNotesContextType } from "../types";
import { API_ENDPOINT } from "../constants";
import AuthContext, { useAuthContext } from "./authContext";
import axios from "axios";

const currentNotesContext = createContext<CurrentNotesContextType>({
    notesContent: "",
    setNotesContent: () => {},
    videoTitle: "",
    thumbnail: "",
    setThumbnail: () => {},
    setVideoTitle: () => {},
    videoId: "",
    setVideoId: () => {},
    isSaved: false,
    setIsSaved: () => {}
});

export const useCurrentNotesContext = () => {
    return useContext(currentNotesContext);
};

export const CurrentNotesContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [notesContent, setNotesContent] = useState<string>("");
    const [videoTitle, setVideoTitle] = useState<string>("");
    const [videoId, setVideoId] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const { userId } = useAuthContext()!;

    useEffect(() => {
        // check if the notes are already saved or not
        checkIsSaved();

    }, [videoId])

    //TODO: Complete the checkIsSaved function to check if the notes are already saved by the user or not
    
    const checkIsSaved = async () => {
        const response = await axios.get(`${API_ENDPOINT}/notes/${videoId}/${userId}`);
    }

    return (
        <currentNotesContext.Provider
            value={{
                notesContent,
                setNotesContent,
                videoTitle,
                thumbnail,
                setThumbnail,
                setVideoTitle,
                videoId,
                setVideoId,
                isSaved,
                setIsSaved
            }}
        >
            {children}
        </currentNotesContext.Provider>
    );

};
export default currentNotesContext; 