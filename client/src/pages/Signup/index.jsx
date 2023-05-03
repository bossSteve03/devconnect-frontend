import React, { useState } from "react";
import { BrandName } from "../../components"
import './index.modules.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { username, email, password });
  };

  return (
    <>
    <form className="signup-form" onSubmit={handleSubmit}>
      <br />
      <h1 className="signup-text">Sign Up!</h1>
      <br />
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      <br />
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      <br />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      <br />
      <button className="submit-btn" type="submit">Submit</button>
      <br />
    </form>
    </>
  );
};
