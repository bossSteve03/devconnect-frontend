import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function DisplayTasks() {
  const [tasks, setTasks] = useState([]);
  const [kanbanId, setKanbanId] = useState();

  const getKanban = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/kanban/${sessionStorage.getItem("project_id")}`);
      const data = await response.json();
      setKanbanId(data["ID"]);
    } catch (error) {
      console.log(error);
    }
  };
  getKanban();

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/kanban/task/${kanbanId}`
      );
      const data = await response.json();
      const tasks = data.map((task) => ({
        id: task.id,
        category: task.category,
        name: task.name,
      }));
      setTasks(tasks);
    };
    getTasks();
  }, [kanbanId]);

  return (
    <>
      <h1>Welcome Back, UserName</h1>
      <div className={styles.tasksContainer}>
        <h1>Your Tasks - Project Name</h1>
        <div className={styles.task}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskContent}>
              <h3>{task.category}</h3>
              <h4>{task.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
