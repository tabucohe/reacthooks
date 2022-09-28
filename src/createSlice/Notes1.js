import React, { useState } from 'react';
import "./App.css";
import { v4 as uuid } from "uuid";
import brick from "../assets/brick.jpg";
import { addNotes, delNote } from './slice';
import {useDispatch, useSelector} from 'react-redux';

const Notes1 = () => {
    const [noteInput, setNoteInput] = useState("");
    const dispatch = useDispatch();
    const notesState = useSelector(state => state)

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
    
        dispatch(addNotes(newNote));
        setNoteInput("");
        console.log(newNote);
      };
    
      const dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
      };

      const dropNote = (event) => {
        event.target.style.left = `${event.pageX - 50}px`;
        event.target.style.top = `${event.pageY - 50}px`;
      };

    
      const style = {
        backgroundImage: `url(${brick})`,
        backgroundSize: "cover",
        height: "100vh",
        padding: "50px",
      };
  return (
    <div>
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
        

        {notesState
                .notes
                .map(note => (
                    <div className="note"
                        style={{ transform: `rotate(${note.rotate}deg)` }}
                        onDragEnd={dropNote}
                        draggable="true"
                        key={note.id}>

                        <div onClick={() => dispatch(delNote(note))}
                            className="close">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <pre className="text">{note.text}</pre>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

export default Notes1