import { useState, useEffect } from "react";
import {
  HasName,
  NeedsName,
  HasSkillLevel,
  NeedsSkillLevel,
  HasSkills,
  NeedsSkills,
  HasRole,
  NeedsRole,
  DisplayTasks,
  DisplayProjects,
} from "../../components/DashboardComponents";
import styles from "./index.module.css";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [nameExists, setNameExists] = useState(false);
  const [skillLevelExists, setSkillLevelExists] = useState(false);
  const [skillsExists, setSkillsExists] = useState(false);
  const [roleExists, setRoleExists] = useState(false);

  async function handleData() {
    const username = sessionStorage.getItem("username");
    const tokenData = sessionStorage.getItem("token");
    const token = tokenData.slice(1, -1);
    const response = await fetch(`http://localhost:8000/user/${username}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const userInfo = await response.json();
    console.log(userInfo)
    setData(userInfo);
    if (userInfo.name !== "") {
      setNameExists(true);
    }
    if (userInfo.role !== "{}") {
      setRoleExists(true);
    }
    if (userInfo.skill_level !== "") {
      setSkillLevelExists(true);
    }
    if (userInfo.skills !== "{}") {
      setSkillsExists(true);
    }
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className={styles['dashboardcontainer']}>
      <DisplayTasks />
      <DisplayProjects />
      <h1 className={styles['profiletasksh1']}>Profile Tasks</h1>
      <div className={styles["profiletasks"]}>
      {nameExists ? <HasName /> : <NeedsName />}
      {skillLevelExists ? <HasSkillLevel /> : <NeedsSkillLevel />}
      {skillsExists ? <HasSkills /> : <NeedsSkills />}
      {roleExists ? <HasRole /> : <NeedsRole />}
      </div>
    </div>
  );
}
