import { createContext, useContext, useState } from "react";
import { CurrentNotesContextType } from "../types";

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