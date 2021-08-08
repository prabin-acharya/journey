import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";

const Main = ({ page, addPage, notes, addNote }) => {
  console.log(page);
  console.log(notes);
  // const mainPage = (page) => {
  //   if (page === "AddPage") {
  //     return <AddPage onAdd={addPage} />;
  //   }
  //   if (page === "Journal") {
  //     return <Journal />;
  //   }
  //   return <Page page={page} />;
  // };

  return (
    <div className="main">
      Inside Main component
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
