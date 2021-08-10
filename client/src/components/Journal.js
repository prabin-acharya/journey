import { useState } from "react";
import AddNote from "./AddNote";

const Journal = ({ notes, onAddNote }) => {
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <div className="journal">
      <button className="btn" onClick={() => setShowAddNote(!showAddNote)}>
        Add a note
      </button>
      {showAddNote && <AddNote onAddNote={onAddNote} />}
      <br />
      {notes.map((note) => (
        <div className="note">
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
