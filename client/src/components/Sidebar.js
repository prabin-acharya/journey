import Searchbar from "./Searchbar";
import Button from "./Button";
import { useState, useEffect } from "react";

const Sidebar = ({ pages, onClick }) => {
  const onClicked = (page) => onClick(page);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/user`, {
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
      <h2>{name}'s journey</h2>
      <Searchbar />
      <Button text="Daily Journal" onClick={() => onClicked("Journal")} />

      <div className="pages">
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
