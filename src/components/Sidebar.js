import DailyJournal from "./DailyJournal";
import Searchbar from "./Searchbar";
import Files from "./Files";

const Sidebar = ({ files }) => {
  return (
    <div className="sidebar">
      <h2>Prabin's journey</h2>
      <Searchbar />
      <DailyJournal />
      <Files files={files} />
    </div>
  );
};

export default Sidebar;
