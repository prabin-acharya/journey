import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topics from "./Topics";

export const SearchBox = ({ pages, setShowSearchBox }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const search = (query) => {
    fetch(`/api/pages/search`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (query.length > 2) {
      setResults([]);
      search({ query: query.trim() });
    }
  }, [query]);

  return (
    <div className="search-box">
      <input
        type="text"
        autoFocus
        placeholder="Search Journey"
        onChange={(e) => setQuery(e.target.value)}
      />
      <hr />
      <div className="search-results">
        {results.map((result) => {
          return (
            <div
              key={result._id}
              className="search-result-page"
              onClick={() => {
                setShowSearchBox(false);
                navigate(`/${result.title.replace(/\s+/g, "-")}-${result._id}`);
              }}
            >
              <div className="search-result-page-header">
                <span className="search-result-title">{result.title}</span>
                <Topics topics={result.topics} />
              </div>
              {result.highlights.map((highlight, index) => {
                return (
                  <span key={index}>
                    {highlight.texts.map((text, index) => {
                      return (
                        <span
                          key={index}
                          className="search-result-page-content"
                        >
                          {text.type === "hit" ? (
                            <span className="highlight-query">
                              {text.value}
                            </span>
                          ) : (
                            <> {text.value}</>
                          )}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
