import { useState } from "react";
import React from "react";

const AddPage = ({ fetchPages }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //Add Page
  const addPage = (page) => {
    fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(page),
    })
      .then(() => fetchPages())
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a title!");
      return;
    }
    addPage({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className="addpage-form" onSubmit={onSubmit}>
      <div className="form-control-title">
        <input
          className="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <textarea
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <input type="submit" value="Save Page" className="btn btn-block" />
    </form>
  );
};

export default AddPage;
