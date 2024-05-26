import { ReactNode, createContext, useContext, useState } from "react";

interface VideoContextType {
    videoId: string,
    updateVideoId: (newValue: string | Error) => void,
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

interface VideoContextProviderProps {
    children: ReactNode;
}

export const VideoContextProvider: React.FC<VideoContextProviderProps> = ({ children }) => {
    const [videoId, setVideoId] = useState<string>('');
  
    const updateVideoId = (newValue: string) => {
      setVideoId(newValue);
    };
  
    const contextValue: VideoContextType = {
      videoId,
      updateVideoId,
    };
  
    return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
  };

  export const useVideoContext = (): VideoContextType => {
    const context = useContext(VideoContext);
    if (!context) {
      throw new Error('useVideoContext must be used within a VideoContextProvider');
    }
    return context;
  };