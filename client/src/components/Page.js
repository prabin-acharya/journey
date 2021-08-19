import { useState } from "react";
import EditPage from "./EditPage";

const Page = ({ page, clickPage, fetchPages }) => {
  const [editStatus, setEditStatus] = useState(false);
  return (
    <div>
      {!editStatus && <h1>{page.title}</h1>}
      <button onClick={() => setEditStatus(!editStatus)}>Edit</button>
      {editStatus && (
        <EditPage
          page={page}
          clickPage={clickPage}
          fetchPages={fetchPages}
          setEditStatus={setEditStatus}
        />
      )}
      <br />
      {!editStatus && <p>{page.content}</p>}
    </div>
  );
};

export default Page;
