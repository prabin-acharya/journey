import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SearchBox = ({ pages, setShowSearchBox }) => {
  const [query, setQuery] = useState("");

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
        {query !== "" &&
          pages.map((page) => {
            const index = page.content
              .toLowerCase()
              .indexOf(query.toLowerCase());
            if (index !== -1) {
              return (
                <Link
                  to={`/${page.title.replace(/\s+/g, "-")}-${page._id}`}
                  key={page._id}
                >
                  <div
                    className="search-result-page"
                    key={page._id}
                    onClick={() => setShowSearchBox(false)}
                  >
                    {page.title}
                    <span className="search-result-page-content">
                      {page.content.substring(index - 50, index + 50)}
                    </span>
                  </div>
                </Link>
              );
            } else {
              <></>;
            }
          })}
      </div>
    </div>
  );
};
