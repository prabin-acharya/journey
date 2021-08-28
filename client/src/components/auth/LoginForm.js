import { useState } from "react";
import React from "react";

const Login_form = ({ setAuthStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please Enter all information!");
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setAuthStatus(true);
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          className="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-control-submit">
        <input type="submit" value="Log In" className="btn-block" />
      </div>
    </form>
  );
};

export default Login_form;
