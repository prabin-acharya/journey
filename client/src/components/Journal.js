import { useState, useEffect } from "react";
import AddNote from "./AddNote";

const Journal = () => {
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
      {showAddNote && <AddNote notes={notes} setNotes={setNotes} />}
      <br />
      {notes[0] &&
        notes.map((note) => (
          <div className="note" key={note._id}>
            <b>{note.Date}</b>
            <span
              style={{
                color: "rgb(29, 161, 242)",
                padding: "0px 8px",
              }}
            >
              {note.topics}
            </span>
            <br />
            {note.content}
            <br />
          </div>
        ))}
    </div>
  );
};

export default Journal;
