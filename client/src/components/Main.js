import AddPage from "./AddPage";
import Page from "./Page";

const Main = ({ page, addPage }) => {
  return (
    <div className="main">
      Inside Main component
      {page === "AddPage" ? <AddPage onAdd={addPage} /> : <Page page={page} />}
    </div>
  );
};

export default Main;
