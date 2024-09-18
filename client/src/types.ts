import React from "react";

export interface TranscriptItem {
    offset: number;
    duration: number;
    text: string;
    lang?: string | undefined;
}

export interface SaveNotesPopupProps {
    onSave: ({ notesName }: { notesName: string }) => Promise<void>;
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
    notes: Notes[]; // Array of note IDs as strings
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
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;  // Version key automatically added by Mongoose
}


/*********************** CONTEXTS TYPES *********************** */
export interface AuthContextType {
    userId: string;
    isAuthenticated: boolean;
    user: User | null;
    setUser: (newValue: User | null) => void;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    logout: () => void;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CurrentNotesContextType {
    notes: Notes,
    setNotes: React.Dispatch<React.SetStateAction<Notes>>,
    videoId: string,
    setVideoId: React.Dispatch<React.SetStateAction<string>>,
    isSaved: boolean,
    setIsSaved: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserContextType {
    savedNotes: Notes[],
    setSavedNotes: React.Dispatch<React.SetStateAction<Notes[]>>,
    fetchAllNotes: () => Promise<Notes[]>,
}