import React from "react";
import { useNavigate } from "react-router-dom";

const PageMenu = ({ page, fetchPages }) => {
  const navigate = useNavigate();

  const deletePage = () => {
    fetch(`/api/pages/${page._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        fetchPages().then(() => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page-menu-content">
      <span onClick={() => deletePage()}>Delete</span>
    </div>
  );
};

export default PageMenu;
