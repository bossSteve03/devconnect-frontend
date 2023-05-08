import { useState, useEffect } from 'react';
import styles from './index.module.css'

export default function User() {

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState([]);
  const [skillLevel, setSkillLevel] = useState('');
  const [skills, setSkills] = useState([]);

  async function handleData() {
    const username = sessionStorage.getItem('username');
    const tokenData = sessionStorage.getItem('token');
    const token = tokenData.slice(1, -1);
    const response = await fetch(`http://localhost:8000/user/${username}`, {
      headers: {
        'x-access-token': token
      }
    });
    const userInfo = await response.json();
    setData(userInfo);
    setLoaded(true)
  };
  
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
        console.log(role)
      };
      if (data.skill_level !== null) {
        setSkillLevel(data.skill_level);
      }
      if (data.skills !== undefined) {
        setSkills(data.skills);
      };
    }
    console.log(name, role, skillLevel, skills)
  }, [data, loaded]);

  const handleChanges = async () => {

    const username = sessionStorage.getItem('username');
    const tokenData = sessionStorage.getItem('token');
    const token = tokenData.slice(1, -1);

    fetch(`http://localhost:8000/user/${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        'name': name,
        'role': role,
        'skill_level': skillLevel,
        'skills': skills
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  function handleShowForm() {
    setShowForm(!showForm)
    console.log(role, name, skills, skillLevel)
  }

  function handleCloseForm() {
    handleChanges();
    handleShowForm();
  }

  const handleNChange = (event) => {
    setName(event.target.value);
  }

  const handleRChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setRole([...role, value]);
      console.log(role)
    } else {
      setSkills(role.filter((role) => role !== value));
    }
  }

  const handleSLChange = (event) => {
    setSkillLevel(event.target.value);
  }

  const handleSChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // Add the selected value to the skills array
      setSkills([...skills, value]);
    } else {
      // Remove the deselected value from the skills array
      setSkills(skills.filter((skill) => skill !== value));
    }
  }

  return (
    <>
      <div className={styles["container"]}>
        { showForm ? <input id="name" type="text" placeholder={data.name ? data.name : 'Enter name here.'} /> : <h1 className={styles["username"]}>{data.name ? data.name : data.username}</h1>}
        { showForm ? <input id="username" type="text" value={data.username} disabled /> : <p>{data.name ? data.username : 'no name yet'}</p>}
        { showForm ? <input id="email" type='text' value={data.email} disabled /> : <p>{data.email}</p>}
        { showForm ? <div className={styles['form-input']}><select multiple id="role" value={role} onChange={handleRChange} >
          <option value="Choose">Choose your role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select><input type="text" value={role} disabled /></div> : <p>{data.role ? data.role : 'no role yet'}</p>}
        { showForm ? <input id="skill_level" type="select" placeholder={data.skill_level ? data.skill_level : 'Choose your skill level.'} multiple={false} /> : <p>{data.skill_level ? data.skill_level : 'no skill level yet'}</p>}
        { showForm ? <input id="skills" type="text" placeholder={data.skills ? data.skills : 'Write down a list of what languages you know here.'} /> : <p>{data.skills ? data.skills : 'no skills yet'}</p>}
        { showForm ? <><button onClick={handleCloseForm}>Save changes</button><button onClick={handleShowForm}>Cancel changes</button></> : <button onClick={handleShowForm}>Edit details</button>}
      </div>
    </>
  );
}
