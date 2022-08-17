import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
 

export default function Home(props) {
  const context = useContext(noteContext);
  const {addNote} = context;
  const {showAlert} = props;
 
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const submitNote = (e, props)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Note added succesfully", "success")

  }

  const onChange =(e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }

  return (
   
      <div className="container my-3">
      <h1>Add Note</h1>
      <form>
        <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title}  onChange={onChange}/>
         </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
         
        <button type="submit" className="btn btn-primary" onClick={submitNote}>Add Note</button>
      </form>
      <div className="container">
      <Notes showAlert={showAlert}/>
     </div>
     </div>
    
)
}
