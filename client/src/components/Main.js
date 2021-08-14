import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, addPage, notes, addNote }) => {
  return (
    <div className="main">
      {page === "Journal" ? (
        <Journal notes={notes} onAddNote={addNote} />
      ) : page === "AddPage" ? (
        <AddPage onAdd={addPage} />
      ) : (
        <Page page={page} />
      )}
    </div>
  );
};

export default Main;
