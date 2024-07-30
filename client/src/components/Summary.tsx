import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT_FOR_SUMMARY_GENERATION } from '../constants';
import { useVideoContext } from '../contexts/videoContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import '../NotesContainerStyles.css';

const Summary: React.FC = () => {

    const {combinedTranscript, updateVideoSummary, videoSummary} = useVideoContext();

    useEffect(() => {
      fetchVideoSummary();
    }, []);

    const fetchVideoSummary = async () => {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  
      try {
        if(!combinedTranscript.length || videoSummary.length) return;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = PROMPT_FOR_SUMMARY_GENERATION + combinedTranscript;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        updateVideoSummary(text);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    videoSummary.length > 0 ?
    <div className="h-full overflow-y-scroll  max-w-full">
      <ReactQuill theme="snow" value={videoSummary} onChange={updateVideoSummary} className='pb-24' />
    </div>  : <LoadingSpinner content='Summary' />
  )
}

export default Summary