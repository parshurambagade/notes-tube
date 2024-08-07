import { GoogleGenerativeAI } from "@google/generative-ai";
import { FETCH_VIDEO_DETAILS, PROMPT_FOR_NOTES_GENERATION } from "../constants";
// import { YoutubeTranscript } from "youtube-transcript";
import {
  FetchVideoDetailsProps,
  FetchVideoNotesProps,
  FetchVideoTranscriptProps,
} from "../types";

export const fetchVideoDetails = async ({
  videoId,
  updateVideoDetails,
}: FetchVideoDetailsProps) => {
  if (!videoId) return;

  try {
    const data = await fetch(FETCH_VIDEO_DETAILS + videoId);
    const json = await data.json();
    updateVideoDetails(json);
  } catch (err) {
    console.error(err);
  }
};

// export const fetchVideoTranscript = async ({
//   videoId,
//   updateTranscript,
//   updateCombinedTranscript,
// }: FetchVideoTranscriptProps) => {
//   if (!videoId) return;

//   try {
//     const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
//     updateTranscript(transcriptData);

//     const fullTranscript: string = transcriptData.reduce((acc, cur) => {
//       return acc + cur.text;
//     }, "");

//     updateCombinedTranscript(fullTranscript);
//   } catch (err) {
//     console.error(err);
//   }
// };

export const fetchVideoNotes = async ({
  combinedTranscript,
  videoNotes,
  updateVideoNotes,
}: FetchVideoNotesProps) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  try {
    if (!combinedTranscript.length || videoNotes.length) return;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = PROMPT_FOR_NOTES_GENERATION + combinedTranscript;
    console.log("Prompt length: ", prompt.length);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    updateVideoNotes(text);
  } catch (err) {
    console.error(err);
  }
};
