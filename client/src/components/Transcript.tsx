import React, { useContext, useEffect, useState } from 'react'
import { useVideoContext } from '../contexts/videoContext';
import { YoutubeTranscript } from 'youtube-transcript';
import LoadingSpinner from './LoadingSpinner';

interface TranscriptItem {
    offset: number;
    duration: number;
    text: string;
    lang?: string | undefined;
}


const Transcript: React.FC = () => {

    const {videoId, transcript} = useVideoContext();

    // useEffect(() => {
    //     fetchVideoTranscript();
    // }, [videoId]);

    // console.log(transcript);

  return (
    transcript.length > 0 ? 
    <div className="h-full overflow-y-scroll  max-w-full pb-16">
      <ul>
        {transcript.map((item) => (
          <li key={item.text}>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
    : <LoadingSpinner content="Transcript"/>
  )
}

export default Transcript;