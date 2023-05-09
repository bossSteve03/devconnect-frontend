import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import styles from "./index.module.css";

export default function User() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [skills, setSkills] = useState([]);

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
    setData(userInfo);
    setLoaded(true);
  }

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    if (loaded) {
      if (data.name !== null) {
        setName(data.name);
      }
      if (data.role !== undefined) {
        setRole(data.role);
        console.log(role);
      }
      if (data.skill_level !== null) {
        setSkillLevel(data.skill_level);
      }
      if (data.skills !== undefined) {
        setSkills(data.skills);
      }
    }
    console.log(name, role, skillLevel, skills);
  }, [data, loaded]);

  const handleChanges = async () => {
    const username = sessionStorage.getItem("username");
    const tokenData = sessionStorage.getItem("token");
    const token = tokenData.slice(1, -1);

    console.log(name, role, skillLevel, skills);
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        name: name,
        role: role,
        skill_level: skillLevel,
        skills: skills,
      }),
    };
    try {
      const response = await fetch(
        `http://localhost:8000/user/${username}`,
        options
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleShowForm() {
    setShowForm(!showForm);
  }

  function handleCloseForm() {
    handleChanges();
    handleShowForm();
  }

  const handleNChange = (event) => {
    setName(event.target.value);
  };

  const optionsRole = [
    "Frontend",
    "Backend",
    "Fullstack",
    "UX",
    "UI",
    "QA",
    "DevOps",
    "Data Science",
    "Other",
  ];
  const handleRChange = (event) => {
    setRole((prevState) => [...prevState, event]);
  };

  const handleRemove = (event) => {
    setRole((prevState) => [...prevState, event]);
  };

  const handleSLChange = (event) => {
    setSkillLevel(event.target.value);
  };

  const optionStacks = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Express",
    "MongoDB",
    "SQL",
    "Python",
    "Java",
    "C#",
    "C++",
    "Other",
  ];

  const handleSChange = (event) => {
    setSkills((prevState) => [...prevState, event]);
  };

  const handleRSkillChange = (event) => {
    setSkills((prevState) => [...prevState, event]);
  };

  return (
    <>
      <div className={styles["container"]}>
        {showForm ? (
          <input
            id="name"
            type="text"
            placeholder={data.name ? data.name : "Enter name here."}
            onChange={handleNChange}
          />
        ) : (
          <h1 className={styles["username"]}>
            {data.name ? data.name : data.username}
          </h1>
        )}
        {showForm ? (
          <input id="username" type="text" value={data.username} disabled />
        ) : (
          <p>{data.name ? data.username : "no name yet"}</p>
        )}
        {showForm ? (
          <input id="email" type="text" value={data.email} disabled />
        ) : (
          <p>{data.email}</p>
        )}
        {showForm ? (
          <Multiselect
            isObject={false}
            onRemove={handleRChange}
            onSelect={handleRemove}
            options={optionsRole}
            placeholder="Choose your role."
          />
        ) : (
          <p>{data.role ? data.role : "no role yet"}</p>
        )}
        {showForm ? (
          <select
            id="skill_level"
            type="select"
            placeholder={
              data.skill_level ? data.skill_level : "Choose your skill level."
            }
            onChange={handleSLChange}
          >
            <option value="Skill Level"> Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        ) : (
          <p>{data.skill_level ? data.skill_level : "no skill level yet"}</p>
        )}
        {showForm ? (
          <Multiselect
            placeholder="Choose your stacks"
            isObject={false}
            onRemove={handleSChange}
            onSelect={handleRSkillChange}
            options={optionStacks}
          />
        ) : (
          <p>{data.skills ? data.skills : "no skills yet"}</p>
        )}
        {showForm ? (
          <>
            <button onClick={handleCloseForm}>Save changes</button>
            <button onClick={handleShowForm}>Cancel changes</button>
          </>
        ) : (
          <button onClick={handleShowForm}>Edit details</button>
        )}
      </div>
    </>
  );
}
