import Login from "./Login";
import Journal_screenshot from "../../images/Journal.png";

const Loginpage = ({ setAuthStatus }) => {
  return (
    <div className="login-page">
      <nav>
        <a href="/">
          <strong>myjourney</strong>
        </a>
      </nav>
      <div className="intro">
        <div>
          <div className="intro-text">
            <h1>Pave your Journey</h1>
            Take Notes. Record your thoughts, ideas. Write essays.
          </div>
        </div>
        <img
          src={Journal_screenshot}
          alt="Screenshot of myJourney's homepage showing Journal(Notes) of user(Prabin)"
        />{" "}
      </div>
      <strong>LogIn</strong>
      <div id="lead-down">
        <a href=" #login">
          <i
            id="lead-down-icon"
            className="fa fa-chevron-down"
            aria-hidden="true"
            style={{ color: "rgb(255, 104, 74)" }}
          ></i>
        </a>
      </div>
      <Login setAuthStatus={setAuthStatus} />
    </div>
  );
};

export default Loginpage;
