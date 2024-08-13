import React, { useEffect, useState } from "react";
import { useVideoContext } from "../contexts/videoContext";
import Notes from "../components/Notes";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import VideoDetailsContainer from "../components/VideoDetailsContainer";
import { fetchVideoDetails, fetchVideoNotes } from "../helpers/videoHelpers";
import { FetchVideoDetailsProps } from "../types";
import { useCurrentNotesContext } from "../contexts/currentNotesContext";
import { FETCH_VIDEO_DETAILS } from "../constants";

// enum contentEnum {
//   NOTES = "Notes",
//   SUMMARY = "Summary",
//   TRANSCRIPT = "Transcript",
// }

const GenerateNotes: React.FC = () => {
  // const [content, setContent] = useState<contentEnum>(contentEnum.NOTES);

  const {videoId, setNotesContent, notesContent, setVideoTitle, setThumbnail} = useCurrentNotesContext();



  useEffect(() => {
    if (videoId) {
      fetchVideoDetails();
      // fetchVideoTranscript({videoId, updateTranscript, updateCombinedTranscript});
    }
  }, [videoId]);

 const fetchVideoDetails = async () => {
    try {
      setNotesContent("");
      setThumbnail("");
      setVideoTitle("");
      const data = await fetch(FETCH_VIDEO_DETAILS + videoId);
      const json = await data.json();
      console.log(json);
     setVideoTitle(json?.items[0]?.snippet?.title);
     setThumbnail(json?.items[0]?.snippet?.thumbnails?.medium?.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" my-4 flex h-max justify-center mx-20 gap-8">
      {/* CONTAINER FOR NOTES AND SUMMARY  */}
      <div className="w-[75vw] h-full overflow-hidden  rounded-lg px-8 py-4 ">
        
        {/* <div className="flex justify-end "> */}
          {/* <div className="flex gap-4 bg-slate-100 px-4 py-2"> */}
              {/* <button
                onClick={() => handleContentChangeClick(contentEnum.NOTES)}
                className={
                  content === contentEnum.NOTES
                    ? `px-4 py-2 rounded text-blue-500 bg-white hover:bg-blue-400 hover:text-white focus:outline-none shadow-sm`
                    : ""
                }
              >
                Notes
              </button> */}
            {/* <button onClick={() => handleContentChangeClick(contentEnum.SUMMARY)} className={content === contentEnum.SUMMARY ? `px-4 py-2 rounded text-blue-500 bg-white hover:bg-blue-400 hover:text-white focus:outline-none shadow-sm` : ''}>Summary</button> */}
            {/* <button onClick={() => handleContentChangeClick(contentEnum.TRANSCRIPT)} className={content === contentEnum.TRANSCRIPT ? `px-4 py-2 rounded text-blue-500 bg-white hover:bg-blue-400 hover:text-white focus:outline-none shadow-sm` : ''}>Transcript</button> */}
          {/* </div> */}
          {/* <div> */}
            {/* TODO: add notes icon */}
            {/* <button className="px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600" disabled={!notesContent.length}> */}
              {/* Save as Note */}
            {/* </button> */}
          {/* </div> */}
        {/* </div> */}

        {/* CONTAINER FOR VIDEO */}
        <VideoDetailsContainer />
        
        <Notes videoId={videoId} />

        {/* {content === contentEnum.NOTES && <Notes videoId={videoId} />} */}
        {/* {content===contentEnum.TRANSCRIPT && <Transcript />} */}
        {/* {content===contentEnum.SUMMARY && <Summary />} */}

        {/* <TranscriptContainer /> */}
      </div>
    </div>
  );
};

export default GenerateNotes;
