import "./project_form.css";
import { useState } from "react";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [techStack, setTechStack] = useState("");
  const [positions, setPositions] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const durationHandler = (e) => {
    setDuration(e.target.value);
  };

  const collaboratorsHandler = (e) => {
    setCollaborators(e.target.value);
  };

  const techStackHandler = (e) => {
    setTechStack(e.target.value);
  };

  const positionsHandler = (e) => {
    setPositions(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const projectSetup = async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // we might need to rename the keys to match the backend
          title: title,
          description: description,
          duration: duration,
          collaborators: collaborators,
          techStack: techStack,
          positions: positions,
        }),
      };
      const response = await fetch("/api/projects", options);
      if (response.ok) {
        console.log("Project created successfully");
        window.location.assign = "/dashboard";
      } else {
        console.log("Project creation failed");
      }
    };
    projectSetup();
  };

  return (
    <>
      <h1>Project Form</h1>
      <form className="project-form-container">
        <label className="project-form-label">Title</label>
        <input
          className="project-form-input"
          type="text"
          onChange={titleHandler}
        />
        <label className="project-form-label">Description</label>
        <input
          className="project-form-input"
          type="text"
          onChange={descriptionHandler}
        />
        <label className="project-form-label">Duration</label>
        <input
          className="project-form-input"
          type="text"
          onChange={durationHandler}
        />
        <label className="project-form-label">Number of Collaborators</label>
        <input
          className="project-form-input"
          type="number"
          onChange={collaboratorsHandler}
        />
        <label className="project-form-label">Tech stack</label>
        <input
          className="project-form-input"
          type="text"
          placeholder="JS, C#"
          onChange={techStackHandler}
        />
        <label className="project-form-label">Positions</label>
        <input
          className="positions-input"
          type="text"
          placeholder="Frontend, UX designer"
          onChange={positionsHandler}
        />
        <button
          className="project-form-button"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </>
  );
}
