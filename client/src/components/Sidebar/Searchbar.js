import { useEffect } from "react";

const Searchbar = ({ setSearch }) => {
  useEffect(() => {
    fetch("/api/journal/topics", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  }, []);

  return (
    <div className="search">
      <input
        type="text"
        readOnly="readOnly"
        onFocus="this.blur();"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
  );
};

export default Searchbar;
