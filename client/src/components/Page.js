import { useState } from "react";
import EditPage from "./EditPage";
import ReactMarkdown from "react-markdown";
import { BiPencil } from "react-icons/bi";

const Page = ({ page, setOpenPage, fetchPages }) => {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <>
      {editStatus ? (
        <EditPage
          page={page}
          setOpenPage={setOpenPage}
          fetchPages={fetchPages}
          setEditStatus={setEditStatus}
        />
      ) : (
        <div className="page">
          <span className="page-heading">
            <h1>{page.title}</h1>
            <button
              id="page-edit-icon"
              onClick={() => setEditStatus(!editStatus)}
            >
              <BiPencil />
            </button>
          </span>
          <div className="page-topics">
            {page.topics &&
              page.topics.map((topic) => (
                <span className="page-topic">#{topic}</span>
              ))}
          </div>

          <span className="page-content">
            <ReactMarkdown children={page.content} />
          </span>
        </div>
      )}
    </>
  );
};

export default Page;
