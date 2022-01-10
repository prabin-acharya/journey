import React from "react";

const Topics = ({ topics }) => {
  return (
    <span className="topics">
      {topics &&
        topics.map((topic, index) => (
          <span className="topic" key={index}>
            #{topic}
          </span>
        ))}
    </span>
  );
};

export default Topics;
