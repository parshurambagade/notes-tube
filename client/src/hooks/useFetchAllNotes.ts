import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

interface Notes {
  _id: string;
  title: string;    
  date: string;
  thumbnail: string;
}

const useFetchAllNotes = (userId: string) => {
  const [savedNotes, setSavedNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/notes/all`, {
        withCredentials: true,
      });
      setSavedNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchAllNotes();
    }
  }, [userId, fetchAllNotes]);

  return { savedNotes, loading, error, fetchAllNotes };
};

export default useFetchAllNotes;
