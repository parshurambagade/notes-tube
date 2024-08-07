export interface TranscriptItem {
    offset: number;
    duration: number;
    text: string;
    lang?: string | undefined;
}

export interface VideoContextType {
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

export interface FetchVideoTranscriptProps {
    videoId: string;
    updateTranscript: (newValue: TranscriptItem[]) => void,
    updateCombinedTranscript: (anyValue: string) => void;
}

export interface FetchVideoDetailsProps {
    videoId: string;
    updateVideoDetails: (newValue: any) => void;
}

export interface FetchVideoNotesProps {
    combinedTranscript: string;
    videoNotes: string | unknown;
    updateVideoNotes: (anyValue: string) => void;
}

export interface LoginFormDataType {
    email: string,
    password: string,
}

export interface RegisterFormDataType {
    email: string,
    password: string,
    username: string
}

export interface User {
    _id: string; // MongoDB ObjectId as a string
    username: string;
    email: string;
    password: string;
    profilePic: string; // URL to the profile picture
    sections: string[]; // Array of section IDs as strings
    notes: string[]; // Array of note IDs as strings
    createdAt: Date;
    updatedAt: Date;
    __v: number; // Version key automatically added by Mongoose
}

export interface AuthContextType {
    authToken: string | null,
    setAuthToken: (newValue: string | null) => void,
    loggedInUser: User | null,
    setLoggedInUser: (newValue: User | null) => void
}