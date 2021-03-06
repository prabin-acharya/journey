import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Sidebar from "./components/Sidebar";
import Journal from "./components/Journal";
import Page from "./components/Page";
import EditPage from "./components/EditPage";
import AddPage from "./components/AddPage";

function App() {
  const token = localStorage.getItem("token");
  const [authStatus, setAuthStatus] = useState(token ? true : false);
  const [pages, setPages] = useState([]);
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
  }, [token, authStatus]);

  if (!authStatus) {
    return (
      <>
        <LoginPage setAuthStatus={setAuthStatus} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar
          pages={pages}
          fetchPages={fetchPages}
          search={search}
          setSearch={setSearch}
          user={user}
          setAuthStatus={setAuthStatus}
        />
        <div className="main">
          <Routes>
            <Route path="" element={<Journal search={search} />} />

            {pages.map((page) => {
              return (
                <Route
                  key={page._id}
                  path={`/${page.title.replace(/\s+/g, "-")}-${page._id}`}
                  element={<Page id={page._id} />}
                ></Route>
              );
            })}
            {pages.map((page) => {
              return (
                <Route
                  key={page._id}
                  path={`/${page.title.replace(/\s+/g, "-")}-${page._id}/edit`}
                  element={<EditPage id={page._id} fetchPages={fetchPages} />}
                ></Route>
              );
            })}
            <Route
              path="/AddPage"
              element={<AddPage fetchPages={fetchPages} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
