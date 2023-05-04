import { useState } from "react";
import styles from './index.module.css'
import { Link } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { username, password });
  };

  return (
    <>
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <br />
        <div className={styles["login-text"]}>
          <h1>Log In!</h1>
          <h1>Log In!</h1>
        </div>
      <br />
      <br />
        <input
          className={styles["form-input"]}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      <br />
        <input
          className={styles["form-input"]}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      <br />
      <button className={styles["submit-btn"]} type="submit">Submit</button>
      <br />
      <div className={styles["signup"]}>
        <p className={styles["signup-message"]}>Don't have an account?</p>
        <Link to="/signup" className={styles["signup-link"]}>Sign up!</Link>
      </div>
    </form>
    </>
  );
};
