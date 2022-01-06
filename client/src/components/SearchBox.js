import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Topics from "./Topics";

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
                    <span className="search-result-title">{page.title}</span>
                    <Topics topics={page.topics} />
                    <span className="search-result-page-content">
                      {page.content.substring(index - 150, index)}
                      <span className="highlight-query">
                        {page.content
                          .substring(index, index + query.length)
                          .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                          .split("|")
                          .at(-1)}
                      </span>
                      {
                        page.content
                          .substring(index + query.length, index + 150)
                          .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                          .split("|")[0]
                      }
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
