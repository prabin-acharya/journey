import { useState } from "react";
import React from "react";
import Login_form from "./Login_form";
import Register_form from "./Register_form";

const Login = ({ setAuthStatus }) => {
  const [registerStatus, setregisterStatus] = useState(false);
  return (
    <>
      {registerStatus ? (
        <Register_form setAuthStatus={setAuthStatus} />
      ) : (
        <Login_form setAuthStatus={setAuthStatus} />
      )}
      <button onClick={() => setregisterStatus(!registerStatus)}>
        {registerStatus ? "Log In" : "Register"}
      </button>
    </>
  );
};

export default Login;
