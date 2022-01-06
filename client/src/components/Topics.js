import React from "react";

const Topics = ({ topics }) => {
  return (
    <span className="topics">
      {topics && topics.map((topic) => <span className="topic">#{topic}</span>)}
    </span>
  );
};

export default Topics;
