import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} =props;
    return (

        <div className="col-md-3">
            <div className="card my-2">

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>

                    
        <button type="submit" className="btn btn-danger btn-sm mx-1" onClick={()=>{deleteNote(note._id)}}>Delete</button>
        <button type="submit" className="btn btn-primary btn-sm mx-1" onClick={()=>{updateNote(note)}}>Edit</button>

                    
               
                </div>
            </div>
        </div>
    )
}
