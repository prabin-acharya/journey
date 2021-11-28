import { useState } from "react";
import React from "react";

const AddPage = ({ fetchPages, setOpenPage }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");

  //Add Page
  const addPage = (page) => {
    fetch("/api/pages", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(page),
    })
      .then((res) => res.json())
      .then((addedPage) => {
        addedPage = addedPage.raw.pages;
        fetchPages().then(() => setOpenPage(addedPage[addedPage.length - 1]));
      })
      .catch((err) => console.log(err));
  };

  const addTopics = (newtopics) => {
    if (newtopics.length > topics.length) {
      if (newtopics.substr(newtopics.length - 1) === ",") {
        newtopics = newtopics + " ";
        setTopics(newtopics);
      } else {
        setTopics(newtopics);
      }
    } else {
      setTopics(newtopics);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const arrayTopics = topics.split(", ");
    addPage({ title, content, arrayTopics });
  };

  return (
    <form className="addpage" onSubmit={onSubmit}>
      <div className="page">
        <div className="form-control-title">
          <input
            className="title"
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control-topics">
          <input
            className="title"
            type="text"
            placeholder="Add Relevant topics.."
            value={topics}
            onChange={(e) => addTopics(e.target.value)}
          />
        </div>
        <div className="form-control">
          <textarea
            type="text"
            placeholder="Start writing here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <button disabled={!title.trim()} type="submit" className="btn">
        Save Page
      </button>
    </form>
  );
};

export default AddPage;
