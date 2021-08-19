import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, clickPage, fetchPages }) => {
  return (
    <div className="main">
      {page === "Journal" ? (
        <Journal />
      ) : page === "AddPage" ? (
        <AddPage fetchPages={fetchPages} />
      ) : (
        <Page page={page} clickPage={clickPage} />
      )}
    </div>
  );
};

export default Main;
