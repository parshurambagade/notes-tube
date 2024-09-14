import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill'
import { useCurrentNotesContext } from '../../../contexts/currentNotesContext';

const NotesContent:React.FC<{allowEditing?: boolean}> = ({allowEditing}) => { 
  const {notes, setNotes} = useCurrentNotesContext();
  const [notesContent,  setNotesContent] = useState<string>(notes.content);

  useEffect(() => {
    setNotes((pre) => ({...pre, content: notesContent})) //TODO: setNotesContent(notesContent);
  },[notesContent])


  return (
    <div className="h-full bg-gray-900 border-gray-600 max-w-full">
        <ReactQuill
          theme="snow"
          value={notesContent}
          onChange={(e) => setNotesContent(e)}  //TODO:
          readOnly={!allowEditing} // Make the editor read-only
          style={{ border: "none" }}
          modules={{ toolbar: allowEditing }} // Hide the toolbar
        />
      </div>  
  )
}

export default NotesContent