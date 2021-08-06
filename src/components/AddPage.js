import { useState } from "react";
import React from "react";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // if (!title) {
    //   alert("Please add a title!");
    //   return;
    // }
    // onAdd({ title, content });
    // setTitle("");
    // setContent("");
  };

  return (
    <form className="addpage-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <input type="submit" value="Save Page" className="btn btn-block" />
    </form>
  );
};

export default AddPage;
