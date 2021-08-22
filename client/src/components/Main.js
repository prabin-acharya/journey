import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, clickPage, fetchPages, search }) => {
  return (
    <div className="main">
      {page === "Journal" ? (
        <Journal search={search} />
      ) : page === "AddPage" ? (
        <AddPage fetchPages={fetchPages} />
      ) : (
        <Page page={page} clickPage={clickPage} fetchPages={fetchPages} />
      )}
    </div>
  );
};

export default Main;
