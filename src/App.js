import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const files = [
    { id: 1, filename: "My Aricle 1" },
    { id: 2, filename: "My Aricle 2" },
    { id: 3, filename: "My Aricle 3" },
    { id: 4, filename: "My Article 4" },
  ];
  return (
    <div className="App">
      <Sidebar files={files} />
      <Main />
    </div>
  );
}

export default App;
