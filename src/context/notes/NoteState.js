import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const fetchNotes = async () => {
    const response = await fetch('http://localhost:5000/api/notes/fetchnotes', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token':   localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }


  const addNote = async (title, description, tag) => {
    const response = await fetch('http://localhost:5000/api/notes/addnote', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const res = await response.json();

    setNotes(notes.concat(res))
  }

  const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem('token')
      },
    });

    const newNote = notes.filter((response) => { return response._id !== id })
    setNotes(newNote)
  }

  const editNote = async (title, description, tag, id) => {
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const res = await response.json();
    console.log(res);

    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id===id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    console.log(newNotes)
    setNotes(newNotes)

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, fetchNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;