import { useState } from "react";
import React from "react";

const AddNote = ({ fetchJournal }) => {
  const [content, setContent] = useState("");

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
    addNote({ content });
    setContent("");
  };

  return (
    <form className="addnote-form" onSubmit={onSubmit}>
      <div className="form-control">
        <textarea
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button disabled={!content.trim()} type="submit" className="btn">
        Save
      </button>
    </form>
  );
};

export default AddNote;
