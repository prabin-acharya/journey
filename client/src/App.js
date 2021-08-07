import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
// import files from "./articles";

function App() {
  const [pages, setPages] = useState([
    { id: 1, title: "Prabin", content: "Default" },
  ]);

  const [openPage, setopenPage] = useState({
    id: 1,
    title: "Prabin",
    content: "Default",
  });

  useEffect(() => {
    const getPages = async () => {
      const pagesfromServer = await fetchPages();
      setPages(pagesfromServer);
    };
    getPages();
  }, []);

  const fetchPages = async () => {
    const res = await fetch("http://localhost:5000/api/pages");
    const data = await res.json();
    return data;
  };

  //Add Page
  const addPage = (page) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newPage = { id, ...page };
    setPages([...pages, newPage]);
  };

  const clickedPage = (page) => {
    setopenPage(page);
  };

  return (
    <div className="App">
      <Sidebar pages={pages} onClick={clickedPage} />
      <Main page={openPage} addPage={addPage} />
    </div>
  );
}

export default App;
