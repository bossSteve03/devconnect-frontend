import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function DisplayProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/project/${sessionStorage.getItem("user_id")}`);
        const data = await response.json();
        console.log(data)
        const mapProjects = data["user projects"].map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          positions: project.positions,
          duration: project.duration,
        }));
        setProjects(mapProjects);
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
        {projects.map((project, i) => (
          <Link to={`/team/${project.id}`}>
            <div className={styles.projectContent} key={i}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
