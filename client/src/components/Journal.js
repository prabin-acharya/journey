import { useState } from "react";
import AddNote from "./AddNote";

const Journal = ({ notes, onAddNote }) => {
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <div>
      <button onClick={() => setShowAddNote(!showAddNote)}>Add a note</button>
      {showAddNote && <AddNote onAddNote={onAddNote} />}
      <br />
      {notes.map((note) => (
        <>
          <h4>{note.Date}</h4>
          <b>{note.content}</b>
          <hr />
          <br />
        </>
      ))}
    </div>
  );
};

export default Journal;
