import ReactQuill from "react-quill";

const NotesContent: React.FC<{
  allowEditing?: boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ allowEditing, content, setContent }) => {
  return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
        readOnly={!allowEditing} // Make the editor read-only
        style={{ border: "none" }}
        modules={{ toolbar: allowEditing }} // Hide the toolbar
      />
    </div>
  );
};

export default NotesContent;
