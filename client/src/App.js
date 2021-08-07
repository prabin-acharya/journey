import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import files from "./articles";

function App() {
  const [pages, setPages] = useState(files);
  const [openFile, setopenFile] = useState(
    files.filter((file) => file.id === 1)[0]
  );

  //Add Page
  const addPage = (file) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newPage = { id, ...file };
    setPages([...pages, newPage]);
  };

  const clickedFile = (file) => {
    setopenFile(file);
  };

  return (
    <div className="App">
      <Sidebar files={pages} onClick={clickedFile} />
      <Main file={openFile} addPage={addPage} />
    </div>
  );
}

export default App;
