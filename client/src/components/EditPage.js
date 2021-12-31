import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const EditPage = ({ page, fetchPages }) => {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [topics, setTopics] = useState(
    page.topics ? page.topics.toString().replace(/,/g, ", ") : ""
  );
  const navigate = useNavigate();

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
    if (!title) {
      alert("Please add a title!");
      return;
    }
    let arrayTopics = topics.split(", ");
    arrayTopics = arrayTopics.filter((topics) => topics.trim() !== "");
    const newPage = { _id: page._id, title, topics: arrayTopics, content };
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
          navigate(`/${page.title}`);
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
            value={topics}
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
