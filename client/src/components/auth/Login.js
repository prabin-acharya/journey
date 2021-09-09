import { useState } from "react";
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = ({ setAuthStatus }) => {
  const [registerStatus, setregisterStatus] = useState(false);
  return (
    <div className="auth-container">
      <nav>
        <a href="/">
          <strong>myjourney</strong>
        </a>
      </nav>

      <h1>{registerStatus ? "Sign Up" : "Log In"}</h1>

      <div className="auth">
        {registerStatus ? (
          <RegisterForm setAuthStatus={setAuthStatus} />
        ) : (
          <LoginForm setAuthStatus={setAuthStatus} />
        )}
        <button onClick={() => setregisterStatus(!registerStatus)}>
          {registerStatus
            ? "Already have an account? "
            : "Don't have an account? "}
          <span className="authstatus">
            {registerStatus ? "Log In" : "Sign Up"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
