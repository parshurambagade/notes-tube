export interface TranscriptItem {
    offset: number;
    duration: number;
    text: string;
    lang?: string | undefined;
}

export interface SaveNotesPopupProps {
    onSave: ({notesName}: {notesName: string}) => Promise<void>;
    onClose: () => void;
    videoTitle: string;
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

/*********************** DATABASE TYPES *********************** */

export interface User {
    _id: string; // MongoDB ObjectId as a string
    username: string;
    email: string;
    password: string;
    profilePic: string; // URL to the profile picture
    notes: string[]; // Array of note IDs as strings
    createdAt: Date;
    updatedAt: Date;
    __v: number; // Version key automatically added by Mongoose
}

export interface Notes {
    _id: string; // MongoDB ObjectId as a string
    title: string;
    thumbnail: string;
    content: string;
    videoId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;  // Version key automatically added by Mongoose
}


/*********************** CONTEXTS TYPES *********************** */
export interface AuthContextType {
    authToken: string | null,
    setAuthToken: (newValue: string | null) => void,
    userId: string | null,
    setUserId: (newValue: string | null) => void
}

export interface UserContextType {
    user: User | null,
    setUser: (newValue: User | null) => void
}   
export interface CurrentNotesContextType {
    notesContent: string,
    setNotesContent: (newValue: string) => void,
    videoTitle: string,
    setVideoTitle: (newValue: string) => void,
    videoId: string,
    setVideoId: (newValue: string) => void,
    thumbnail: string,
    setThumbnail: (newValue: string) => void
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
