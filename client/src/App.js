import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import LoginPage from "./components/auth/LoginPage";

function App() {
  const token = localStorage.getItem("token");
  const [authStatus, setAuthStatus] = useState(token ? true : false);
  const [pages, setPages] = useState([]);
  const [openPage, setOpenPage] = useState("Journal");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();

  const getUser = () => {
    fetch("/api/auth/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((res) => {
        if (res.status === 400) {
          localStorage.removeItem("token");
          setAuthStatus(false);
        } else if (res.status === 401) {
          setAuthStatus(false);
        } else {
          setAuthStatus(true);
          res.json().then((data) => setUser(data));
        }
      })
      .catch((err) => {
        setAuthStatus(false);
      });
  };

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/pages", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    token && getUser();
    authStatus && fetchPages();
  }, [authStatus, token]);

  if (!authStatus) {
    return (
      <>
        <LoginPage setAuthStatus={setAuthStatus} />
      </>
    );
  }

  return (
    <div className="app">
      <Sidebar
        pages={pages}
        setOpenPage={setOpenPage}
        search={search}
        setSearch={setSearch}
        openPage={openPage}
        user={user}
      />
      <Main
        page={openPage}
        fetchPages={fetchPages}
        setOpenPage={setOpenPage}
        search={search}
        user={user}
        setAuthStatus={setAuthStatus}
      />
    </div>
  );
}

export default App;
