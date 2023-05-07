import styles from "./index.module.css";
import { useState } from "react";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [techStack, setTechStack] = useState("");
  const [positions, setPositions] = useState("");
  const [kanbanId, setKanbanId] = useState("");

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
          // we will need to get chat room key from the backend
          user_id: 1,
          title: title,
          description: description,
          number_of_collaborators: collaborators,
          duration: duration,
          tech_stack: techStack,
          chatroom_key: "123c",
          positions: positions,
        }),
      };
      const response = await fetch("http://127.0.0.1:8000/project/1", options);
      if (response.ok) {
        const data = await response.json();
        setKanbanId(data["Project ID"]);
        console.log("Project created successfully");
        const createKanban = async () => {
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(
            `http://127.0.0.1:8000/kanban/${kanbanId}`,
            options
          );
          if (response.ok) {
            console.log("Kanban created successfully");
          } else {
            console.log("Kanban creation failed");
          }
        };
        createKanban();
        // window.location.assign = "/dashboard";
      } else {
        console.log("Project creation failed");
      }
    };
    projectSetup();
  };

  return (
    <>
      <h1>Project Form</h1>
      <form className={styles["project-form-container"]}>
        <label htmlFor="title" className={styles["project-form-label"]}>
          Title
        </label>
        <input
          id="title"
          className={styles["project-form-input"]}
          type="text"
          onChange={titleHandler}
        />

        <label htmlFor="description" className={styles["project-form-label"]}>
          Description
        </label>
        <input
          id="description"
          className={styles["project-form-input"]}
          type="text"
          onChange={descriptionHandler}
        />

        <label htmlFor="duration" className={styles["project-form-label"]}>
          Duration
        </label>
        <input
          id="duration"
          className={styles["project-form-input"]}
          type="text"
          onChange={durationHandler}
        />

        <label htmlFor="collaborators" className={styles["project-form-label"]}>
          Number of Collaborators
        </label>
        <input
          id="collaborators"
          className={styles["project-form-input"]}
          type="number"
          onChange={collaboratorsHandler}
        />

        <label htmlFor="techStack" className={styles["project-form-label"]}>
          Tech stack
        </label>
        <input
          id="techStack"
          className={styles["project-form-input"]}
          type="text"
          placeholder="JS, C#"
          onChange={techStackHandler}
        />

        <label htmlFor="positions" className={styles["project-form-label"]}>
          Positions
        </label>
        <input
          id="positions"
          className={styles["positions-input"]}
          type="text"
          placeholder="Frontend, UX designer"
          onChange={positionsHandler}
        />

        <button
          className={styles["project-form-button"]}
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </>
  );
}
