import { useState, useEffect } from "react";
import AddNote from "./AddNote";

const Journal = ({ onAddNote }) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/journal", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  return (
    <div className="journal">
      <button className="btn" onClick={() => setShowAddNote(!showAddNote)}>
        Add a note
      </button>
      {showAddNote && <AddNote onAddNote={onAddNote} />}
      <br />
      {notes.map((note) => (
        <div className="note" key={note._id}>
          <b>{note.Date}</b>
          <br />
          {note.content}
          <br />
        </div>
      ))}
    </div>
  );
};

export default Journal;
