import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, addPage }) => {
  return (
    <div className="main">
      {page === "Journal" ? (
        <Journal />
      ) : page === "AddPage" ? (
        <AddPage onAdd={addPage} />
      ) : (
        <Page page={page} onAdd={addPage} />
      )}
    </div>
  );
};

export default Main;
