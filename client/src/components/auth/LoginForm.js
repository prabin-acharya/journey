import { useState } from "react";
import React from "react";

const Login_form = ({ setAuthStatus, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please Enter all Fields!");
      return;
    }
    const loginUser = {
      email: email,
      password: password,
    };

    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginUser),
    }).then((res) => {
      if (res.status === 400) {
        return res.json().then((err) => err.msg && setError(err.msg));
      }
      return res.json().then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setAuthStatus(true);
        }
      });
    });
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError();
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label>
          Enter your password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError();
            }}
          />
        </label>
      </div>
      <div className="form-control-submit">
        <input type="submit" value="Log In" className="btn-block" />
      </div>
    </form>
  );
};

export default Login_form;
