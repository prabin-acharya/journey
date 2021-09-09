import { useState } from "react";
import React from "react";

const AddPage = ({ fetchPages, setOpenPage }) => {
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
      .then((res) => res.json())
      .then((addedPage) => {
        fetchPages().then(() => setOpenPage(addedPage));
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPage({ title, content });
  };

  return (
    <form className="addpage" onSubmit={onSubmit}>
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
      <button disabled={!title.trim()} type="submit" className="btn">
        Save Page
      </button>
    </form>
  );
};

export default AddPage;
