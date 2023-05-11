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
      if (name !== "") {
        setName(name);
      }
      if (role !== "") {
        setRole(role);
      }
      if (skillLevel !== "") {
        setSkillLevel(skillLevel);
      }
      if (skills !== "") {
        setSkills(skills);
      }
    }
  }, [loaded]);

  const handleChanges = async () => {
    const username = sessionStorage.getItem("username");
    const tokenData = sessionStorage.getItem("token");
    const token = tokenData.slice(1, -1);

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
      const data = await response.json();
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
    "DataScience",
    "Other",
  ];
  const handleRChange = (event) => {
    setRole(event);
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
    setSkills(event);
  };

  const handleRSkillChange = (event) => {
    setSkills((prevState) => [...prevState, event]);
  };

  return (
    <>
      <div className={styles["user-container"]}>
        {showForm ? (
          <input
            id="name"
            type="text"
            placeholder={data.name ? data.name : "Enter name here."}
            onChange={handleNChange}
            className={styles["name-input"]}
          />
        ) : (
          <h1 className={styles["username"]}>
            Hi, {data.name ? data.name : data.username}
          </h1>
        )}
        {showForm ? (
          <input
            className={styles["username-input"]}
            id="username"
            type="text"
            value={data.username}
            disabled
          />
        ) : (
          <p className={styles["name"]}>
            {data.name ? data.username : "no name yet"}
          </p>
        )}
        {showForm ? (
          <input
            className={styles["email-input"]}
            id="email"
            type="text"
            value={data.email}
            disabled
          />
        ) : (
          <p className={styles["email"]}>{data.email}</p>
        )}
        {showForm ? (
          <select
            className={styles["skill-input"]}
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
          <p className={styles["skill-level"]}>
            {data.skill_level ? data.skill_level : "no skill level yet"}
          </p>
        )}
        <div className={styles["multiselect"]}>
          {showForm ? (
            <Multiselect
              isObject={false}
              onRemove={handleRemove}
              onSelect={handleRChange}
              options={optionsRole}
              placeholder="Choose your role."
              className={styles["searchWrapper"]}
            />
          ) : (
            <p className={styles["role"]}>
              {data.role ? data.role.slice(1, -1) : "no role yet"}
            </p>
          )}
          {showForm ? (
            <Multiselect
              className={styles["searchWrapper"]}
              placeholder="Choose your stacks"
              isObject={false}
              onRemove={handleRSkillChange}
              onSelect={handleSChange}
              options={optionStacks}
            />
          ) : (
            <p className={styles["skills"]}>
              {data.skills ? data.skills.slice(1, -1) : "no skills yet"}
            </p>
          )}
        </div>
        {showForm ? (
          <>
            <div className={styles["btn-container"]}>
              <button
                className={styles["save-btn"]}
                onClick={() => {
                  handleCloseForm();
                  window.location.reload();
                }}
              >
                Save changes
              </button>
              <button className={styles["cancel-btn"]} onClick={handleShowForm}>
                Cancel changes
              </button>
            </div>
          </>
        ) : (
          <button className={styles["edit-btn"]} onClick={handleShowForm}>
            Edit details
          </button>
        )}
      </div>
    </>
  );
}
