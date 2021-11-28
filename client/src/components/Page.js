import { useState } from "react";
import EditPage from "./EditPage";
import ReactMarkdown from "react-markdown";
import { BiPencil } from "react-icons/bi";

const Page = ({ page, setOpenPage, fetchPages }) => {
  const [editStatus, setEditStatus] = useState(false);
  return (
    <div className="page">
      <div className="page-heading">
        {!editStatus && <h1>{page.title}</h1>}
        <button id="page-edit-icon" onClick={() => setEditStatus(!editStatus)}>
          {!editStatus && <BiPencil />}
        </button>
        {editStatus && (
          <EditPage
            page={page}
            setOpenPage={setOpenPage}
            fetchPages={fetchPages}
            setEditStatus={setEditStatus}
          />
        )}
      </div>
      {!editStatus && <ReactMarkdown children={page.content} />}
    </div>
  );
};

export default Page;
