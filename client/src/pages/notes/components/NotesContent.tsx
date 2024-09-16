import React from "react";
import ReactQuill from "react-quill";

interface NotesContentProps {
  allowEditing?: boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const NotesContent: React.FC<NotesContentProps> = ({ allowEditing, content, setContent }) => {
  return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
        readOnly={!allowEditing}
        style={{ border: "none" }}
        modules={{ toolbar: allowEditing }}
        className="text-sm sm:text-base"
      />
    </div>
  );
};

export default NotesContent;