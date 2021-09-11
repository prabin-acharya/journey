import { useState } from "react";
import React from "react";

const Register_form = ({ setAuthStatus }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please Enter all information!");
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setAuthStatus(true);
        fetch("/api/journal", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        fetch("/api/pages", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
      });

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          className="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          className="email"
          type="email"
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
        <input type="submit" value="Sign Up" className="btn-block" />
      </div>
    </form>
  );
};

export default Register_form;
