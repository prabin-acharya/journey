import { useState } from "react";
import React from "react";

const AddNote = ({ fetchJournal }) => {
  const [content, setContent] = useState("");
  const [showSave, setShowSave] = useState(false);

  const addNote = (note) => {
    fetch("/api/journal", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    })
      .then(() => fetchJournal())
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    document.querySelector("#textarea-note").blur();
    addNote({ content });
    setContent("");
  };

  return (
    <form className="addnote-form" onSubmit={onSubmit}>
      <div className="form-control">
        <textarea
          id="textarea-note"
          type="text"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setShowSave(true)}
          onBlur={() => setShowSave(false)}
        />
      </div>
      {showSave && (
        <button
          type="submit"
          className="btn"
          onMouseDown={(e) => onSubmit(e)}
          disabled={!content.trim()}
        >
          Save
        </button>
      )}
    </form>
  );
};

export default AddNote;
