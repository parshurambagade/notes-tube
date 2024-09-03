import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // include styles
import "../NotesContainerStyles.css";
import axios from "axios";
import { API_ENDPOINT, YOUTUBE_IFRAME_URL } from "../constants";
import LoadingSpinner from "../components/LoadingSpinner";
import { Notes } from "../types";
import VideoDetailsContainer from "../components/VideoDetailsContainer";
import { DUMMY_VIDEO_ID, DUMMY_NOTES_CONTENT, DUMMY_NOTES_TITLE } from "../utils/dummy-data.ts";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { MdSaveAs } from "react-icons/md";
import { redirect, useNavigate, useParams } from "react-router-dom";

const EditNotes: React.FC = () => {
  const [notes, setNotes] = useState<Notes>({
    _id: "",
    title: "",
    thumbnail: "",
    content: "",
    videoId: "",
    createdBy: "",
    createdAt: new Date(0),
    updatedAt: new Date(0),
    __v: 0,
  });

  const {notesId} = useParams();

  const { title, content, videoId } = notes;

  const [notesContent, setNotesContent] = useState(content);

  const [isLoading, setIsLoading] = useState<boolean>(false);

//   const [allowEditing, setAllowEditing] = useState(false);

  const navigate = useNavigate();

  // TODO: add api call to fetch saved notes
  // useEffect(() => {
  //   fetchNotes();
  // }, [notesId]);

  useEffect(() => {
    setNotesContent(notes.content);
  }, [notes]);

  const fetchNotes = async () => {
    try {
      if (!notesId.length) return;
      // TODO: add parameter notes id in the url.
      const response = await axios.post(`${API_ENDPOINT}/notes/1`);
      setNotes(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="parent lg:px-48 py-8 w-full  h-max bg-gray-900">
      {/* header of notes */}
      <div className="notes-header bg-gray-800 py-2 px-4 rounded-t-lg border-gray-700 w-full flex justify-between items-center">

        <div className="flex gap-2 items-center">
        <p className="text-gray-300 font-bold text-xl">{DUMMY_NOTES_TITLE}</p>
        <span className="text-gray-400 text-xs">- Updated 2 Days Ago</span>
        </div>

        {/* card buttons  */}
        <div className="flex w-max justify-between gap-4">
          <button onClick={() => {navigate('/notes/' + notesId)}} className="flex items-center gap-1 text-xs px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            <span>
              <FaRegBookmark />
            </span>
            <span>Save</span>
          </button>
          <button onClick={() => confirm("Delete notes?")} className="text-xs flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            <span>
              <RiDeleteBin6Line />
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/* VIDEO  */}
      <div className="video">
        <iframe
          className="h-[60vh] w-full aspect-video"
          src={YOUTUBE_IFRAME_URL + DUMMY_VIDEO_ID} // TODO: add videoId here
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="YouTube video"
          sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
        ></iframe>
      </div>

      {/* NOTES CONTENT  */}
      <div className="h-full bg-gray-900 border-gray-600 max-w-full">
        <ReactQuill
          theme="snow"
          value={DUMMY_NOTES_CONTENT}
          onChange={setNotesContent}
          readOnly={false} // Make the editor read-only
          style={{ border: "none" }}
          modules={{ toolbar: true }} // Hide the toolbar
        />
      </div>
    </div>
  );
};

export default EditNotes;
