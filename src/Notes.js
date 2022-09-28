import React, { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import brick from "./assets/brick.jpg";
import "./App.css";
import Sticky from "./components/Sticky";

export const NotesContext = React.createContext();
export const AddDispatch = React.createContext();

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        notes: [...prevState.notes, action.payload],
        totalNotes: prevState.notes.length + 1,
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
      };
      console.log("After ADD_NOTE: ", newState);
      return newState;
    }

    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
        totalNotes: prevState.notes.length - 1,
      };
      console.log("After DELETE_NOTE: ", newState);
      return newState;
    }

    default:
      return prevState;
  }
};

export function Notes() {
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
  const [noteInput, setNoteInput] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    if (!noteInput) {
      return;
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    setNoteInput("");
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const style = {
    backgroundImage: `url(${brick})`,
    backgroundSize: "cover",
    height: "100vh",
    padding: "50px",
  };

  return (
    <NotesContext.Provider value={notesState}>
      {" "}
      <div className="app" onDragOver={dragOver} style={style}>
        <h1>
          Sticky Notes ({notesState.totalNotes})
          <span>
            {notesState.notes.length
              ? `Last note created: ${notesState.lastNoteCreated}`
              : " "}
          </span>
        </h1>

        <form className="note-form" onSubmit={addNote}>
          <textarea
            placeholder="Create a new note..."
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
          ></textarea>
          <button>Stick it</button>
        </form>
        <AddDispatch.Provider value={dispatch}>
          <Sticky />
        </AddDispatch.Provider>
      </div>
    </NotesContext.Provider>
  );
}
