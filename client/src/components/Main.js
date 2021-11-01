import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";
import { FiMoreHorizontal } from "react-icons/fi";

const Main = ({ page, setOpenPage, fetchPages, search }) => {
  return (
    <div className="main">
      <FiMoreHorizontal size={35} className="more-icon" />
      {page === "Journal" ? (
        <Journal search={search} />
      ) : page === "AddPage" ? (
        <AddPage fetchPages={fetchPages} setOpenPage={setOpenPage} />
      ) : (
        <Page page={page} setOpenPage={setOpenPage} fetchPages={fetchPages} />
      )}
    </div>
  );
};

export default Main;
