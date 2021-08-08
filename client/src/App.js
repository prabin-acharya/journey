import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
// import files from "./articles";

function App() {
  const [pages, setPages] = useState([]);
  const [openPage, setopenPage] = useState(pages[0]);

  useEffect(() => {
    const getPages = async () => {
      const pagesfromServer = await fetchPages();
      setPages(pagesfromServer);
      setopenPage(pagesfromServer[0]);
    };
    getPages();
  }, []);

  const fetchPages = async () => {
    const res = await fetch("http://localhost:5000/api/pages");
    const data = await res.json();
    return data;
  };

  //Add Page
  const addPage = async (page) => {
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newPage = { id, ...page };
    // setPages([...pages, newPage]);
    const res = await fetch(`http://localhost:5000/api/pages`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(page),
    });
    const data = await res.json();
    setPages([...pages, data]);
  };

  const clickedPage = (page) => {
    setopenPage(page);
  };

  return (
    <div className="App">
      <Sidebar pages={pages} onClick={clickedPage} />
      {openPage && <Main page={openPage} addPage={addPage} />}
    </div>
  );
}

export default App;
