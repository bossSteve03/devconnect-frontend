import React, { useState, useEffect } from "react";
import { useProjects } from "../../context";

export default function ProjectsSearch() {
  const { projectsContext, setProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false); // Set loading state to false once the data is fetched
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading state to false in case of an error
      }
    };

    getProjects();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading state
  }

  console.log(projectsContext);
  return (
    <>
      <h2>SearchBar</h2>
      {projectsContext &&
        projectsContext.map((project, i) => (
          <div key={i}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
    </>
  );
}
