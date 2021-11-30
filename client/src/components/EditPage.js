import { useState } from "react";
import React from "react";

const EditPage = ({ page, setOpenPage, fetchPages, setEditStatus }) => {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [strTopics, setStrTopics] = useState(
    page.topics ? page.topics.toString().replace(/,/g, ", ") : ""
  );
  console.log(page.topics);

  const addTopics = (newtopics) => {
    if (newtopics.length > strTopics.length) {
      if (newtopics.substr(newtopics.length - 1) === ",") {
        newtopics = newtopics + " ";
        setStrTopics(newtopics);
      } else {
        setStrTopics(newtopics);
      }
    } else {
      setStrTopics(newtopics);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a title!");
      return;
    }
    const topics = strTopics.split(", ");
    const newPage = { _id: page._id, title, topics, content };
    editPage(newPage);
  };

  const editPage = (newPage) => {
    fetch(`/api/pages/${newPage._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newPage),
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
      <div className="page">
        <div className="form-control-title">
          <input
            className="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control-topics">
          <input
            className="title"
            type="text"
            placeholder="Add Relevant topics.."
            value={strTopics}
            onChange={(e) => addTopics(e.target.value)}
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
      </div>
      <button type="submit" className="btn">
        Save Page
      </button>
    </form>
  );
};

export default EditPage;
