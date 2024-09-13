import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { Notes } from "../types";


const useFetchNotes = (notesId: string) => {

  const [fetchedNotes, setFetchedNotes] = useState<Notes>({} as Notes);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/notes/${notesId}`, {
        withCredentials: true,
      });
      setFetchedNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
      setLoading(false);
    }
  }, [notesId]);

  useEffect(() => {
    if (notesId) {
      fetchNotes();
    }
  }, [notesId, fetchNotes]);

  return { fetchedNotes, loading, error };
};

export default useFetchNotes;
