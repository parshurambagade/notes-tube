import { ReactNode, createContext, useContext, useState } from "react";

interface VideoContextType {
    videoId: string,
    updateVideoId: (newValue: string) => void,
    transcript: TranscriptItem[],
    updateTranscript: (newValue: TranscriptItem[]) => void,
    combinedTranscript: string,
    updateCombinedTranscript: (newValue: string) => void,
    videoDetails: any,
    updateVideoDetails: (newValue: any) => void,
    videoNotes: string | unknown,
    updateVideoNotes: (newValue: string) => void,
    videoSummary: string,
    updateVideoSummary: (newValue: string) => void
}

interface TranscriptItem {
  offset: number;
  duration: number;
  text: string;
  lang?: string | undefined;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

interface VideoContextProviderProps {
    children: ReactNode;
}

export const VideoContextProvider: React.FC<VideoContextProviderProps> = ({ children }) => {
    const [videoId, setVideoId] = useState<string>('');
    const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
    const [videoDetails, setVideoDetails] = useState(null);
    const [videoNotes, setVideoNotes] = useState<string | unknown>('');
    const [combinedTranscript, setCombinedTranscript] = useState<string>('');
    const [videoSummary, setVideoSummary] = useState<string>('');


    const updateVideoId = (newValue: string) => {
      setVideoId(newValue);
    };

    const updateTranscript = (newValue: TranscriptItem[]) => {
      setTranscript(newValue);
    }

    const updateVideoDetails = (newValue: any) => {
      setVideoDetails(newValue);
    }

    const updateVideoNotes = (newValue: string | unknown) => {
      setVideoNotes(newValue);
    }

    const updateCombinedTranscript = (newValue: string) => {
      setCombinedTranscript(newValue);
    }
  
    const updateVideoSummary = (newValue: string) => {
      setVideoSummary(newValue);
    }

    const contextValue: VideoContextType = {
      videoId,
      updateVideoId,
      transcript,
      updateTranscript,
      videoDetails,
      updateVideoDetails,
      videoNotes,
      updateVideoNotes,
      combinedTranscript,
      updateCombinedTranscript,
      updateVideoSummary,
      videoSummary
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