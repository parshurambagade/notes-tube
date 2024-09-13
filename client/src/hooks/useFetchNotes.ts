import { useCallback, useState } from "react";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { useCurrentNotesContext } from "../contexts/currentNotesContext";
import { API_ENDPOINT } from "../constants";

const useGenerateNotes = () => {
  const { setNotes } = useCurrentNotesContext();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const generateNotes = useCallback(
    async (videoId: string) => {
      try {
        if (!videoId) return;

        setError(false);
        setIsGenerating(true);

        const response = await axios.post(`${API_ENDPOINT}/notes/generate`, {
          videoId,
        });

        const sanitizedHTML = DOMPurify.sanitize(response?.data?.content);

        setNotes({
          content: sanitizedHTML,
          videoId,
          title: response?.data?.videoDetails?.snippet?.title,
          thumbnail:
            response?.data?.videoDetails?.snippet?.thumbnails?.medium?.url,
        });

        setIsGenerating(false);
      } catch (err) {
        setIsGenerating(false);
        setError(true);
        console.error("Error fetching notes:", err);
      }
    },
    [setNotes]
  );

  return { generateNotes, setIsGenerating, isGenerating, error, setError };
};

export default useGenerateNotes;
