import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function DisplayProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/project/getbyid/${sessionStorage.getItem("project_id")}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [setProjects]);
  return (
    <>
      <h1 className={styles['projectsh1']}>Your Projects</h1>
      <div className={styles.projectsContainer}>
        <Link to={`/auth/team`}>
          <div className={styles.projectContent}>
            <h3>{projects.title}</h3>
            <p>{projects.description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
