import { useState, useEffect, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import PageMenu from "./PageMenu";

const ListItem = ({ search, text, page, fetchPages, topics, onClick, id }) => {
  const [highlight, setHighlight] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);
  const charLimit = 20;

  if (text.length > charLimit) {
    text = text.substring(0, charLimit) + "...";
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (search && search.length > 2) {
      if (topics.length) {
        topics.filter(
          (topic) => topic.toUpperCase().indexOf(search.toUpperCase()) > -1
        ).length && setHighlight(true);
      }
    } else {
      setHighlight(false);
    }
  }, [search, topics, highlight]);

  return (
    <div id={id} className={"page-list"} onClick={onClick}>
      <div>
        <strong>{text}</strong>
      </div>
      <div className="page-menu">
        <FiMoreHorizontal
          size={18}
          className="more-icon"
          onClick={() => setIsActive(!isActive)}
        />
        {isActive && (
          <div ref={menuRef}>
            <PageMenu page={page} fetchPages={fetchPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
