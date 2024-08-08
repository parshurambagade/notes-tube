import React, { useEffect, useState } from "react";
import { useVideoContext } from "../contexts/videoContext";
import Notes from "../components/Notes";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import VideoDetailsContainer from "../components/VideoDetailsContainer";
import { fetchVideoDetails, fetchVideoNotes } from "../helpers/videoHelpers";

enum contentEnum {
  NOTES = "Notes",
  SUMMARY = "Summary",
  TRANSCRIPT = "Transcript",
}

const GenerateNotes: React.FC = () => {
  const [content, setContent] = useState<contentEnum>(contentEnum.NOTES);
  // const [fullTranscript, setFullTranscript] = useState("");
  const {
    updateVideoId,
    transcript,
    videoDetails,
    updateTranscript,
    updateVideoDetails,
    videoId,
    videoNotes,
    updateVideoNotes,
    combinedTranscript,
    updateCombinedTranscript,
  } = useVideoContext();

  const handleContentChangeClick = (content: contentEnum) => {
    setContent(content);
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails({ videoId, updateVideoDetails });
      // fetchVideoTranscript({videoId, updateTranscript, updateCombinedTranscript});
    }
  }, [videoId]);

  return (
    <div className=" my-4 flex h-max justify-center mx-20 gap-8">
      {/* CONTAINER FOR NOTES AND SUMMARY  */}
      <div className="w-[75vw] h-full overflow-hidden border rounded-lg px-8 py-4 ">
        
        <div className="flex justify-end ">
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
          <div>
            {/* TODO: add notes icon */}
            <button className="px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:bg-blue-600">
              Save as Note
            </button>
          </div>
        </div>

        {/* CONTAINER FOR VIDEO */}
        <VideoDetailsContainer />

        {content === contentEnum.NOTES && <Notes videoId={videoId} />}
        {/* {content===contentEnum.TRANSCRIPT && <Transcript />} */}
        {/* {content===contentEnum.SUMMARY && <Summary />} */}

        {/* <TranscriptContainer /> */}
      </div>
    </div>
  );
};

export default GenerateNotes;
