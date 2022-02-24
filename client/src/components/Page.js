import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { BiPencil } from "react-icons/bi";
import Topics from "./Topics";
import RelatedPages from "./RelatedPages";

const Page = ({ id }) => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    return () => {
      setPage();
      setIsLoading(true);
    };
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Loader
            type="TailSpin"
            color="grey"
            // radius={10}
            height={40}
            width={40}
          />
        </div>
      ) : (
        <div className="page-container">
          <div className="page">
            <span className="page-heading">
              <h1>{page.title}</h1>
              <Link to={`/${page.title.replace(/\s+/g, "-")}-${page._id}/edit`}>
                <BiPencil className="page-edit-icon" />
              </Link>
            </span>
            <Topics topics={page.topics} />
            <span className="page-content">
              <ReactMarkdown children={page.content} />
            </span>
          </div>
          <RelatedPages topics={page?.topics?.join(" ")} />
        </div>
      )}
    </>
  );
};

export default Page;
