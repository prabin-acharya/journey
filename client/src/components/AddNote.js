import { useState } from "react";
import React from "react";

const AddNote = ({ onAddNote }) => {
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAddNote({ content });
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
