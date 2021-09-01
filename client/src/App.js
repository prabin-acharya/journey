import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Login from "./components/auth/Login";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const [pages, setPages] = useState([]);
  const [openPage, setOpenPage] = useState("Journal");
  const [search, setSearch] = useState("");

  const getUser = () => {
    fetch("/api/auth/user", {
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

  useEffect(() => {
    if (authStatus) fetchPages();
  }, [authStatus]);

  const fetchPages = async () => {
    const res = await fetch("/api/pages", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setPages(data);
  };

  const clickPage = (page) => {
    setOpenPage(page);
  };

  if (!authStatus) {
    return (
      <>
        <Login setAuthStatus={setAuthStatus} />
      </>
    );
  }

  return (
    <div className="app">
      <Sidebar
        pages={pages}
        clickPage={clickPage}
        search={search}
        setSearch={setSearch}
        openPage={openPage}
      />
      <Main
        page={openPage}
        fetchPages={fetchPages}
        clickPage={clickPage}
        search={search}
      />
    </div>
  );
}

export default App;
