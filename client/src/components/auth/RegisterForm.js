import { useState } from "react";
import React from "react";

const Register_form = ({ setAuthStatus, setError }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please Enter all information!");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => {
      if (res.status === 400) {
        return res.json().then((err) => err.msg && setError(err.msg));
      }
      return res.json().then((data) => {
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
    });
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError();
        }}
      />
      <input
        className="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError();
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError();
        }}
      />
      <div className="form-control-submit">
        <input type="submit" value="Sign Up" className="btn-block" />
      </div>
    </form>
  );
};

export default Register_form;
