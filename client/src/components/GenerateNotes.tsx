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

  const { videoId, setNotesContent, setVideoTitle, setThumbnail } =
    useCurrentNotesContext();

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (videoId) {
      setIsError(false);
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

  if(isError){
      return (
        <div className="border border-zinc-700 bg-zinc-800 p-6 my-6 rounded-lg">
        <h3 className="text-2xl text-red-500 font-bold">🤧 Unable to Generate Notes!</h3>
        <ul className="list-disc list-inside">
          <li>The video length must not exceed 40 minutes.</li>
          <li>Only English-language videos are supported.</li>
          <li>If the video is in another language, it should be no longer than 10 minutes.</li>
        </ul>
      </div>
      
      )}

  return (
    <div className=" my-4 flex h-max justify-center mx-20 gap-8">
      {/* CONTAINER FOR NOTES AND SUMMARY  */}
      <div className="w-[75vw] h-full overflow-hidden  rounded-lg px-8 py-4 ">
      
        {/* CONTAINER FOR VIDEO */}
        <VideoDetailsContainer />

        <Notes videoId={videoId} errorState={{ isError, setIsError }} />

        {/* {content === contentEnum.NOTES && <Notes videoId={videoId} />} */}
        {/* {content===contentEnum.TRANSCRIPT && <Transcript />} */}
        {/* {content===contentEnum.SUMMARY && <Summary />} */}

        {/* <TranscriptContainer /> */}
      </div>
    </div>
  );
};

export default GenerateNotes;
