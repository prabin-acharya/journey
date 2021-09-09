import { useState } from "react";
import React from "react";

const EditPage = ({ page, setOpenPage, fetchPages, setEditStatus }) => {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a title!");
      return;
    }
    const newPage = { _id: page._id, title, content };
    editPage(newPage);
  };

  const editPage = (newPage) => {
    fetch(`/api/pages/${newPage._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, content }),
    })
      .then(() => {
        fetchPages().then(() => {
          setOpenPage(newPage);
          setEditStatus(false);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="editpage" onSubmit={onSubmit}>
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
      <button type="submit" className="btn">
        Save Page
      </button>
    </form>
  );
};

export default EditPage;
