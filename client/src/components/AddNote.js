import { useState } from "react";
import React from "react";

const AddNote = ({ getJournals }) => {
  const [content, setContent] = useState("");

  const addNote = (note) => {
    fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        console.log(res.json());
        getJournals();
      })
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
      <input type="submit" value="Save" className="btn btn-block" />
    </form>
  );
};

export default AddNote;
