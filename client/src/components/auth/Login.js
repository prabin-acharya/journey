import { useState } from "react";
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = ({ setAuthStatus }) => {
  const [registerStatus, setregisterStatus] = useState(false);
  return (
    <div className="auth">
      <h1>myjourney</h1>
      {registerStatus ? (
        <RegisterForm setAuthStatus={setAuthStatus} />
      ) : (
        <LoginForm setAuthStatus={setAuthStatus} />
      )}
      <button onClick={() => setregisterStatus(!registerStatus)}>
        <span className="authstatus">
          {registerStatus ? "Log In" : "Register"}
        </span>
      </button>
    </div>
  );
};

export default Login;
