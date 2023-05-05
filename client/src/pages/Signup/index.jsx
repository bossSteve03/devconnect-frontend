import { useState } from "react";
import styles from './index.module.css'
import { Link } from "react-router-dom";

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
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <br />
      <div className={styles["signup-text"]}>
      <h1 className={styles["signup-text"]}>Sign Up!</h1>
      <h1 className={styles["signup-text"]}>Sign Up!</h1>
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
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
      <div className={styles["login"]}>
        <p className={styles["login"]}>Already have an account?</p>
        <Link to="/login" className={styles["login-link"]}>Log In!</Link>
      </div>
    </form>
    </>
  );
};
