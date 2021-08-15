import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null });

  useEffect(() => {
    setState({ data: null });
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setState({ state: data }));
  }, [url]);

  return state;
};
