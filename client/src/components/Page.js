import { useState } from "react";
import EditPage from "./EditPage";
import { BiPencil } from "react-icons/bi";

const Page = ({ page, clickPage, fetchPages }) => {
  const [editStatus, setEditStatus] = useState(false);
  return (
    <div className="page">
      <div className="page-heading">
        {!editStatus && <h1>{page.title}</h1>}
        <button onClick={() => setEditStatus(!editStatus)}>
          {!editStatus && <BiPencil />}
        </button>
        {editStatus && (
          <EditPage
            page={page}
            clickPage={clickPage}
            fetchPages={fetchPages}
            setEditStatus={setEditStatus}
          />
        )}
      </div>
      {!editStatus && <p>{page.content}</p>}

      {/* <h1>{page.title}</h1> */}
    </div>
  );
};

export default Page;
