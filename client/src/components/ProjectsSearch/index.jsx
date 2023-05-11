import React, { useState, useEffect } from "react";
import { useProjects } from "../../context";
import styles from './index.module.css'

export default function ProjectsSearch() {
  const { projects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    projects.length > 0 && setIsLoading(false);
  }, [projects]);

  useEffect(() => {
    const filteredProjects = projects.filter((project) =>
      keys.some((key) =>
        project[key].toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProjects(filteredProjects);
  }, [query, projects]);

  const keys = ["title", "description", "positions", "duration"];

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleApply = async (e,project) => {
    console.log("user",sessionStorage.getItem("user_id"))
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        name: sessionStorage.getItem("username"),
        level: 0,
        role: "Team member"
      }),
    };
    console.log(options)
    const response = await fetch(
      `http://127.0.0.1:8000/teammember/${project.id}`,
      options
    );
    if (response.ok) {
      alert("welcome to the Team!");
      sessionStorage.setItem('project_id', project.id)
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
    <section className={styles["Header"]}>
      <h2 className={styles["page-heading"]}><strong>Projects</strong></h2>
      <input type="text" placeholder="Search" className={styles["searchbar"]} onChange={searchHandler} />
    </section>
      <section className={styles["project-container"]}>

      {projects.length === 0 ? (
        <p>No projects found.</p>
        ) : (
          filteredProjects.map((project, i) => (
            <div className={styles["container"]} key={i}>
            <h3 className={styles["project-title"]}><strong>{project.title}</strong></h3>
            <p className={styles["project-description"]}>
              Description: {project.description}
            </p>
            <p className={styles["project-description"]}>Pos: {project.positions}</p>
            <p className={styles["project-description"]}>
              Duration: {project.duration} days
            </p>
            <button className={styles["apply-button"]} onClick={(e)=>{handleApply(e,project)}}>
              Apply
            </button>
          </div>
        ))
        )}
      </section>
    </>
  );
}
