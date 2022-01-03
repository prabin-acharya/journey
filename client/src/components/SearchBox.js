import React from "react";
import { useState } from "react";

export const SearchBox = () => {
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

      <div className="search-results"> Search Results for {query}</div>
    </div>
  );
};
