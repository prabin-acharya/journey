import React, { useState, useEffect } from "react";

const SeeAlso = ({ topics }) => {
  const [pages, setPages] = useState();
  console.log(topics);

  const search = (query) => {
    fetch(`/api/pages/references`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search({ query: topics });
  }, [topics]);

  return <div className="seeAlso"></div>;
};

export default SeeAlso;
