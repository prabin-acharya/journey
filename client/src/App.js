import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
function App() {
  const [pages, setPages] = useState([]);
  const [openPage, setopenPage] = useState(pages[0]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getPages = async () => {
      const pagesfromServer = await fetchPages();
      setPages(pagesfromServer);
      setopenPage(pagesfromServer[0]);
    };
    getPages();

    const getNotes = async () => {
      const notesfromServer = await fetchNotes();
      setNotes(notesfromServer);
    };
    getNotes();
  }, []);

  const fetchPages = async () => {
    const res = await fetch("http://localhost:5000/api/pages");
    const data = await res.json();
    return data;
  };

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/journal");
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

  const addNote = async (note) => {
    const res = await fetch(`http://localhost:5000/api/journal`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    setNotes([data, ...notes]);
  };

  const clickedPage = (page) => {
    setopenPage(page);
  };

  return (
    <div className="App">
      <Sidebar pages={pages} onClick={clickedPage} />
      {openPage && (
        <Main
          page={openPage}
          addPage={addPage}
          notes={notes}
          addNote={addNote}
        />
      )}
    </div>
  );
}

export default App;
