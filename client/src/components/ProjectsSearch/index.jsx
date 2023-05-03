import React, { useState, useEffect } from "react";
import { useProjects } from "../../context/index";

export default function ProjectsSearch() {
  const { projects, setProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films");
        const data = await response.json();
        const mapProjects = data.results.map((project) => {
          return {
            title: project.title,
            description: project.opening_crawl,
          };
        });
        setProjects(mapProjects);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getProjects();
  }, []);

  const keys = ["title", "description"];
  useEffect(() => {
    const filteredProjects = projects.filter((project) =>
      keys.some((key) =>
        project[key].toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProjects(filteredProjects);
  }, [query]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <h2>SearchBar</h2>
      <input type="text" placeholder="Search" onChange={searchHandler} />
      {filteredProjects &&
        filteredProjects.map((project, i) => (
          <div key={i}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
    </>
  );
}
