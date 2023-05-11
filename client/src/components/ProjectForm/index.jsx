import styles from "./index.module.css";
import { useState } from "react";
import { useProjects } from "../../context";
import { useNavigate } from "react-router-dom";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [techStack, setTechStack] = useState("");
  const [positions, setPositions] = useState("");
  const navigate = useNavigate();
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

  // const createKanban = async (id) => {
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   const response = await fetch(`http://127.0.0.1:8000/kanban/${id}`, options);
  //   console.log(response);
  //   if (response.ok) {
  //     console.log("Kanban created successfully");
  //   } else {
  //     console.log("Kanban creation failed");
  //   }
  // };

  // const createCalendar = async (id) => {
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   const response = await fetch(`http://127.0.0.1:8000/calendar/${id}`, options);
  //   console.log(response);
  //   if (response.ok) {
  //     console.log("Calendar created successfully");
  //   } else {
  //     console.log("Calendar creation failed");
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    const projectSetup = async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          title: title,
          description: description,
          number_of_collaborators: collaborators,
          duration: duration,
          tech_stack: techStack || "",
          chatroom_key: "123c",
          positions: positions || "",
          name: sessionStorage.getItem("username"),
          level: 1,
          role: "Project Owner",
        }),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/project/create",
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Project created successfully");
        console.log(data);
        // createKanban(data["Project ID"]);

        // const projectMemberSetup = async (id) => {
        //   const options2 = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       project_id: id,
        //       user_id: sessionStorage.getItem("user_id"),
        //       name: sessionStorage.getItem('username'),
        //       level: 1,
        //       role: 'Project Owner'
        //     })
        //   };
        //   const newResponse = await fetch(`http://localhost:8000/teammember/${ sessionStorage.getItem("user_id") }`, options2);
        //   if (newResponse.ok) {
        //     console.log('Team Member created successfully');
        //     console.log(await newResponse.json())
        //   } else {
        //     console.log('Team Member not created successfully');
        //     console.log(await newResponse.json())
        //   };
        // };
        // setTimeout(createKanban(data["Project ID"]), 500);
        // setTimeout(createCalendar(data["Project ID"]), 500);
        // setTimeout(projectMemberSetup(data["Project ID"]), 500);
        sessionStorage.setItem("project_id", data.project_id);
        navigate("/auth/dashboard");
      } else {
        console.log("Project creation failed");
      }
    };
    projectSetup();
  };

  return (
    <>
      <h1 className={styles["project-form-title"]}>Create Your Project</h1>
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
          Duration (in days)
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
          className={styles["project-form-input"]}
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
