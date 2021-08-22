import Searchbar from "./Searchbar";
import Button from "./Button";
import { useState, useEffect } from "react";

const Sidebar = ({ pages, clickPage, search, setSearch }) => {
  const onClicked = (page) => {
    clickPage(page);
  };
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/auth/user", {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) =>
      res.json().then((data) => {
        setName(data.name);
      })
    );
  }, [name]);

  return (
    <div className="sidebar">
      <span className="name">
        <h2> {name}'s journey</h2>
      </span>
      <Searchbar search={search} setSearch={setSearch} />
      <Button text="Daily Journal" onClick={() => onClicked("Journal")} />

      <div className="pages-sidebar">
        <ul>
          {pages[0] &&
            pages.map((page) => (
              <Button
                key={page._id}
                text={page.title}
                onClick={() => onClicked(page)}
              />
            ))}
        </ul>
      </div>

      <Button text="Add Page" onClick={() => onClicked("AddPage")} />
    </div>
  );
};

export default Sidebar;
