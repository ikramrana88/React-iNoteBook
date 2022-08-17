import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import {useNavigate} from 'react-router-dom'

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      
      fetchNotes()
      // eslint-disable-next-line
    }
    else{
      navigate('/login')
    }

  }, [])
  const ref = useRef(null);
  const refClose = useRef(null)

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

  }

  const submitNote = (e, props) => {
    e.preventDefault();
    editNote(note.etitle, note.edescription, note.etag, note.id)
    refClose.current.click()
    props.showAlert("Note updated succesfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <div className="row">

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                </div>

               </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={submitNote}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <h1 className='my-3'>Your Notes</h1>
      <div className="contaciner">
        {notes.length===0 && "No notes to display"}
      </div>
      {notes.map((note) => {
        return <NoteItem note={note} updateNote={updateNote} key={note._id} />
      })}
    </div>
  )
}
