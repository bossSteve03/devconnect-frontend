import React, { useState, useEffect } from "react";
import { useProjects } from "../../context/index";
import "./searchform.css";

export default function ProjectsSearch() {
  const { projects, setProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/project/1");
        const data = await response.json();
        console.log(typeof data["user projects"]);
        const mapProjects = data["user projects"].map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
        }));
        setProjects(mapProjects);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getProjects();
  }, [setProjects]);

  useEffect(() => {
    const filteredProjects = projects.filter((project) =>
      keys.some((key) =>
        project[key].toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProjects(filteredProjects);
  }, [query, projects]);

  const keys = ["title", "description"];

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleApply = (e) => {
    e.preventDefault();
    console.log("Apply button clicked");
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
            <p className="project-description">{project.description}</p>
            <button className="apply-button" onClick={handleApply}>
              Apply
            </button>
          </div>
        ))
      )}
    </>
  );
}
