import React, { useState, useEffect } from "react";
import { useProjects } from "../../context";
import "./searchform.css";

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
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <h2 className="page-heading">SearchBar</h2>
      <input type="text" placeholder="Search" onChange={searchHandler} />
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        filteredProjects.map((project, i) => (
          <div key={i}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">
              Description: {project.description}
            </p>
            <p className="project-description">Pos: {project.positions}</p>
            <p className="project-description">
              Duration: {project.duration} days
            </p>
            <button className="apply-button" onClick={(e)=>{handleApply(e,project)}}>
              Apply
            </button>
          </div>
        ))
      )}
    </>
  );
}
