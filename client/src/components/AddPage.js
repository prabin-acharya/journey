import { useState } from "react";
import { useNavigate } from "react-router";
import React from "react";

const AddPage = ({ fetchPages }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");
  const navigate = useNavigate();

  const validCharacters = /^[ A-Za-z0-9_]*$/;

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
        fetchPages().then(() => {
          const page = addedPage.data;
          navigate(`/${page.title.replace(/\s+/g, "-")}-${page._id}`);
        });
      })
      .catch((err) => console.log(err));
  };

  //add space after comma
  const addTopics = (newtopics) => {
    if (newtopics.length > topics.length) {
      newtopics.slice(-1) === ","
        ? setTopics(newtopics + " ")
        : setTopics(newtopics);
    } else {
      setTopics(newtopics);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let arrayTopics = topics.split(", ");
    arrayTopics = arrayTopics.filter((topics) => topics.trim() !== "");
    addPage({ title: title.trim(), topics: arrayTopics, content });
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
            onChange={(e) => {
              e.target.value.match(validCharacters) && setTitle(e.target.value);
            }}
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
