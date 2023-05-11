import { useState } from "react";
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'
import  tokenService from "../../services/tokenService"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = tokenService();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(
      new Buffer.from(`${username}:${password}`).toString("base64")
    );
  };

  const handleLogin = async (auth) => {
      const options = {
        method: "GET",
      headers: { 
        "Content-Type": "application/json" ,
        Authorization: `Basic ${auth}`
      }      
    };
    const response = await fetch("http://localhost:8000/user/login", options);
    console.log(response);
    if (response.ok) {
      let data = await response.json();
      const new_ops = {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "x-access-token" : data.token
      }};
      const get_user_id = await fetch (`http://localhost:8000/user/${username}`,new_ops)
      if (get_user_id.ok){
        const data = await get_user_id.json()
        sessionStorage.removeItem("user_id")
        sessionStorage.setItem("user_id", data.user_id)
      }
      sessionStorage.removeItem("id")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("project_id")
      setToken(data.token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("id", data.public_id);
      try{
        const check = await (await fetch(`http://localhost:8000/teammember/getProjectMemberByUsername/${username}`)).json()
        if (check.message === "No member found with the given username"){
          console.log("user has no project")
          sessionStorage.setItem("project_id",0)
        }
        else {
          sessionStorage.setItem("project_id",check[0].project_id)
        }
      }
      catch (e){
    
       }
       navigate("/auth/dashboard");
       window.location.reload()
    } else {
      alert("Invalid Credentials");
    }
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
        <button className={styles["submit-btn"]} type="submit">
          Submit
        </button>
        <br />
        <div className={styles["signup"]}>
          <p className={styles["signup-message"]}>Don't have an account?</p>
          <Link to="/signup" className={styles["signup-link"]}>
            Sign up!
          </Link>
        </div>
      </form>
    </>
  );
}
