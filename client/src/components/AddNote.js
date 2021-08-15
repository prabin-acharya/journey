import { useState } from "react";
import React from "react";

const AddNote = () => {
  const [content, setContent] = useState("");

  const addNote = (note) => {
    fetch(`http://localhost:5000/api/journal`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    }).catch((err) => console.log(err));
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
      <input type="submit" value="Save" className="btn btn-block" />
    </form>
  );
};

export default AddNote;
