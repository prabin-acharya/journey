import { useState } from "react";
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = ({ setAuthStatus }) => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const [error, setError] = useState();

  return (
    <div className="login" id="login">
      <div>
        <h1>{displayRegister ? "Sign Up" : "Log In"}</h1>

        <div className="login-main">
          {displayRegister ? (
            <RegisterForm setAuthStatus={setAuthStatus} setError={setError} />
          ) : (
            <LoginForm setAuthStatus={setAuthStatus} setError={setError} />
          )}
          {error && <div className="auth-error">{error}</div>}

          <button
            onClick={() => {
              setError();
              setDisplayRegister(!displayRegister);
            }}
          >
            {displayRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <span className="login-register">
              {displayRegister ? "Log In" : "Sign Up"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
