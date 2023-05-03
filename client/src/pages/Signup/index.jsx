import React, { useState } from "react";
import { BrandName } from "../../components"

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
    <BrandName />
    <form onSubmit={handleSubmit}>
      <label className="form-label">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button className="submit-btn" type="submit">Submit</button>
    </form>
    </>
  );
};
