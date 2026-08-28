import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Register({ goLogin }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const validate = () => {
    let nameReg = /^[A-Za-z ]+$/;
    let mobReg = /^[0-9]{10}$/;
    let uname = /^[A-Za-z0-9]+$/;
    let pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!nameReg.test(form.name)) {
      setError("Name must contain only letters.");
      return false;
    }
    if (!mobReg.test(form.mobile)) {
      setError("Mobile must be 10 digits.");
      return false;
    }
    if (!uname.test(form.username)) {
      setError("Username must be letters & numbers only.");
      return false;
    }
    if (!pass.test(form.password)) {
      setError("Password must have uppercase, lowercase & special char.");
      return false;
    }

    return true;
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:5000/api/auth/register", form)
      .then(() => {
        alert("Registration successful!");
        goLogin();
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "Something went wrong, try again!"
        );
      });
  };

  return (
    <div className="main-container">
      <div className="card">
        <h2>Register Student</h2>

        <form onSubmit={submitRegister}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

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

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already registered?{" "}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={goLogin}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
