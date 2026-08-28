import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Login({ goRegister, onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const validate = () => {
    let uname = /^[A-Za-z0-9]+$/;
    let pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!uname.test(form.username)) {
      setError("Username should contain only letters and numbers.");
      return false;
    }
    if (!pass.test(form.password)) {
      setError("Password must have uppercase, lowercase, special character.");
      return false;
    }
    return true;
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:5000/api/auth/login", form)
      .then((res) => {
        onLogin(res.data.user); // Login success
      })
      .catch(() => {
        setError("Invalid login credentials!");
      });
  };

  return (
    <div className="main-container">
      <div className="card">
        <h2>Student Login</h2>

        <form onSubmit={submitLogin}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          New user?{" "}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={goRegister}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
