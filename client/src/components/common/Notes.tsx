import ReactQuill from "react-quill";

const Notes: React.FC = () => {

  
    return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
      <ReactQuill
        theme="snow"
        value={'NOTES VALUES HERE'}
        onChange={() => {}}  //TODO: 
        readOnly={true} // Make the editor read-only
        style={{border:"none"}}
        modules={{ toolbar: false }} // Hide the toolbar
      />
    </div>
    );
  
};  

export default Notes;
