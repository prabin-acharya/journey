import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Loader from "react-loader-spinner";

const EditPage = ({ id, fetchPages }) => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");
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

  useEffect(() => {
    fetch(`/api/pages/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setTitle(data.title);
        setTopics(
          data.topics ? data.topics.toString().replace(/,/g, ", ") : ""
        );
        setContent(data.content);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    return () => setPage();
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a title!");
      return;
    }
    let arrayTopics = topics.split(", ");
    arrayTopics = arrayTopics.filter((topics) => topics.trim() !== "");
    const newPage = {
      _id: page._id,
      title: title.trim(),
      topics: arrayTopics,
      content,
    };
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
          navigate(`/${newPage.title.replace(/\s+/g, "-")}-${newPage._id}`);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Loader
            type="TailSpin"
            color="grey"
            // radius={10}
            height={40}
            width={40}
          />
        </div>
      ) : (
        <div className="page">
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
            <div className="form-control-topics">
              <input
                className="title"
                type="text"
                placeholder="Add Relevant topics.."
                value={topics}
                onChange={(e) => addTopics(e.target.value)}
              />
            </div>
            <div className="form-control-content">
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
        </div>
      )}
    </>
  );
};

export default EditPage;
