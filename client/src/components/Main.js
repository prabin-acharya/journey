import AddPage from "./AddPage";
import Page from "./Page";

const Main = ({ page, addPage }) => {
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
      {page === "AddPage" ? <AddPage onAdd={addPage} /> : <Page page={page} />}
    </div>
  );
};

export default Main;
