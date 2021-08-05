import DailyJournal from "./DailyJournal";
import Searchbar from "./Searchbar";
import Files from "./Files";

const Sidebar = ({ files, onClick }) => {
  return (
    <div className="sidebar">
      <h2>Prabin's journey</h2>
      <Searchbar />
      <DailyJournal onClick={onClick} />
      <Files files={files} onClick={onClick} />
    </div>
  );
};

export default Sidebar;
