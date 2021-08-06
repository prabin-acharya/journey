import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import files from "./articles";

function App() {
  const [openFile, setopenFile] = useState(
    files.filter((file) => file.id === 1)[0]
  );

  const clickedFile = (file) => {
    setopenFile(file);
  };

  return (
    <div className="App">
      <Sidebar files={files} onClick={clickedFile} />
      <Main file={openFile} />
    </div>
  );
}

export default App;
