import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Login from "./components/auth/Login";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      setAuthStatus(true);
    } catch (err) {
      setAuthStatus(false);
      console.log(err);
    }
  };

  const [pages, setPages] = useState([]);
  const [openPage, setopenPage] = useState(pages[0]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getUser();

    console.log(authStatus);
    console.log(token);

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
    const res = await fetch("http://localhost:5000/api/pages", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  };

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/journal", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  };

  //Add Page
  const addPage = async (page) => {
    const res = await fetch(`http://localhost:5000/api/pages`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(page),
    });
    const data = await res.json();
    setPages([...pages, data]);
  };

  const addNote = async (note) => {
    const res = await fetch(`http://localhost:5000/api/journal`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
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
      {authStatus ? (
        <div>
          <Sidebar pages={pages} onClick={clickedPage} />
          <Main
            page={openPage}
            addPage={addPage}
            notes={notes}
            addNote={addNote}
          />
        </div>
      ) : (
        <div>
          <Login setAuthStatus={setAuthStatus} />
        </div>
      )}
    </div>
  );
}

export default App;
