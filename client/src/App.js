import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Login from "./components/auth/Login";

function App() {
  const [authStatus, setAuthStatus] = useState(false);

  const getUser = async () => {
    fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => setAuthStatus(true))
      .catch((err) => {
        setAuthStatus(false);
      });
  };

  const token = localStorage.getItem("token");
  if (token) {
    getUser();
  }

  const [pages, setPages] = useState([]);
  const [openPage, setopenPage] = useState("Journal");

  useEffect(() => {
    if (authStatus) {
      const getPages = async () => {
        const pagesfromServer = await fetchPages();
        setPages(pagesfromServer);
        // setopenPage(pagesfromServer[0]);
      };
      getPages();
    }
  }, [authStatus]);

  const fetchPages = async () => {
    const res = await fetch("http://localhost:5000/api/pages", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    return await res.json();
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

  const clickedPage = (page) => {
    setopenPage(page);
  };

  if (!authStatus) {
    return (
      <>
        <Login setAuthStatus={setAuthStatus} />
      </>
    );
  }

  return (
    <div className="App">
      <Sidebar pages={pages} onClick={clickedPage} />
      <Main page={openPage} addPage={addPage} />
    </div>
  );
}

export default App;
