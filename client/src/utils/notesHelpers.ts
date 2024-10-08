import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { useCurrentNotesContext } from "../contexts/currentNotesContext";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { Notes } from "../types";


const useNotes = () => {
  const [savedNotes, setSavedNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { setNotes, setVideoId, setIsSaved } = useCurrentNotesContext();
  const { userId, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // Fetch all notes
  const fetchAllNotes = useCallback(async () => {

    if (!userId || !isAuthenticated) return;
    setError(null);
    setLoading(true);
    setSavedNotes([]);

    try {
      const response = await axios.get(`${API_ENDPOINT}/notes/all/${userId}`, {
        withCredentials: true,
      });
      setSavedNotes(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching all notes:", err);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId, isAuthenticated]);

  // Fetch a single note by ID
  const fetchNotes = useCallback(async (notesId: string) => {
    if (!notesId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_ENDPOINT}/notes/${notesId}`, {
        withCredentials: true,
      });
      setNotes(response.data);
      setVideoId(response.data.videoId);
      setIsSaved(true);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [setNotes, setVideoId, setIsSaved]);

  // Generate notes from a video
  const generateNotes = useCallback(
    async (videoId: string) => {
      if (!videoId) return;
      setError(null);
      setIsGenerating(true);
      try {
        const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
          videoId,
          userId,
        });



        const sanitizedHTML = DOMPurify.sanitize(response?.data?.content);
        setNotes({
          _id: '1', //todo: fix this
          content: sanitizedHTML,
          videoId,
          title: response?.data?.videoDetails?.snippet?.title,
          thumbnail:
            response?.data?.videoDetails?.snippet?.thumbnails?.medium?.url,
        });
        setVideoId(videoId);
        setIsSaved(false);
      } catch (err: any) {

        if (err.response.status == 400) {
          alert(err.response.data.message);
          navigate(`/notes/${err.response.data.notes._id}`);
        }
        console.error("Error generating notes:", err);
        setError("Failed to generate notes. Please try again.");
        alert(err.response?.data?.message || "Failed to generate notes.");
      } finally {
        setIsGenerating(false);
      }
    },
    [setNotes, setVideoId, setIsSaved, navigate, userId]
  );


  // delete notes by ID
  const deleteNotes = useCallback(
    async (notesId: string) => {
      if (!isAuthenticated) {
        alert("You need to log in to update notes.");
        return;
      }
      try {
        const response = await axios.delete(
          `${API_ENDPOINT}/notes/${notesId}`,
          { withCredentials: true }
        );
        alert(response.data.message);
        navigate("/dashboard");
      } catch (err: any) {
        console.error("Error deleting notes:", err);
        alert(err.response?.data?.message || "Failed to delete notes.");
        navigate("/dashboard");
      }
    },
    [fetchAllNotes, navigate, isAuthenticated]
  );

  const updateNotes = useCallback(
    async (notesId: string, notesContent: string) => {
      try {
        if (notesContent.length && notesId) {
          const response = await axios.put(
            `${API_ENDPOINT}/notes/${notesId}`,
            {
              content: notesContent,
            },
            {
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            fetchNotes(notesId);
            alert("Notes updated successfully");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }, [fetchNotes]);

  useEffect(() => {
    if (!userId) return;
    fetchAllNotes();
  }, [userId, fetchAllNotes, isAuthenticated]);


  return {
    savedNotes,
    loading,
    error,
    isGenerating,
    fetchAllNotes,
    fetchNotes,
    generateNotes,
    updateNotes,
    deleteNotes,
  };
};

export default useNotes;
