import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, setOpenPage, fetchPages, search }) => {
  return (
    <div className="main">
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
