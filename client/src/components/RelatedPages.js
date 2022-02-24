import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RelatedPages = ({ topics }) => {
  const [pages, setPages] = useState();
  const navigate = useNavigate();

  const search = (query) => {
    fetch(`/api/pages/references`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search({ query: topics });
  }, [topics]);

  return (
    <div className="related-pages-container">
      <h1>Related </h1>
      <div className="related-pages">
        {pages?.map((page) => {
          return (
            <div
              className="related-page"
              onClick={() => {
                navigate(`/${page.title.replace(/\s+/g, "-")}-${page._id}`);
              }}
            >
              <h2>{page.title}</h2>
              <span className="topics">{page.topics.join("  ")}</span>
              <span>{page.content.substring(0, 230)}...</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPages;
