import { useState, useEffect } from "react";

const Button = ({ search, text, topics, onClick, id }) => {
  const [highlight, setHighlight] = useState(false);
  const charLimit = 27;

  if (text.length > charLimit) {
    text = text.substring(0, charLimit) + "...";
  }
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
    <div>
      <button
        id={id}
        onClick={onClick}
        className={highlight ? "search-highlight" : null}
      >
        <strong>{text}</strong>
      </button>
    </div>
  );
};

export default Button;
