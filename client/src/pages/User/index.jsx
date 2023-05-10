import { useState, useEffect } from 'react';
import styles from './index.module.css'

export default function User() {

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showSkillLevel, setShowSl] = useState(false)
  const [show_Skills, set_Show_Skills] = useState(false)
  const [name, setName] = useState('');
  const [role, setRole] = useState([]);
  const [custom_role,set_custom_role] = useState("")
  const [skillLevel, setSkillLevel] = useState('');
  const [skills, setSkills] = useState([]);
  const [wantCustom,setWantCustom] = useState(false)

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

  // const handleRChange = (event) => {
  //   const value = event.target.value;
  //   if (event.target.checked) {
  //     setRole([...role, value]);
  //     console.log(role)
  //   } else {
  //     //setSkills(role.filter((role) => role !== value));
  //   }
  // }

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
  //{ showEmail ? <input id="username" type="text" value={data.username} disabled /> : <p onDoubleClick={()=>setShowEmail(true)}>{data.name ? data.username : 'no name yet'}</p>}
  return (
    <>
      <div className={styles["container"]}>
       <h1 className={styles["username"]}>{data.username}</h1>
        { showName ?( <><input id="name" value = {name} type="text" onChange={(e)=>{setName(e.target.value)}}  placeholder={data.name ? data.name : 'Enter name here.'}/> <button onClick={()=>setShowName(false)}>Y</button> </>):<p1 onDoubleClick={()=>{setShowName(true)}} className={styles["username"]}> Name: {data.name || name ? data.name || name : "No Current Name"}</p1>}
        { showEmail ? <input id="email" type='text' value={data.email}  /> : <p>Email: {data.email}</p>}
        { showRole ? <div className={styles['form-input']}><select multiple id="role" value={role} onChange={(e)=>{setRole(e.target.value); setShowRole(false);setWantCustom(false)}}>
          <option value="Choose">Choose your role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value ="Backend">Backend</option>
          <option value ="Frontend">Frontend</option>
        </select><input type = "text" value = {custom_role} placeholder='Custom Role'  onChange = {(e)=>{set_custom_role(e.target.value);setWantCustom(true)}}/><button onClick={()=>setShowRole(false)}>Y</button></div> : <p onDoubleClick={()=>setShowRole(true)}>Role: {wantCustom? custom_role : role ? role : data.role ? data.role : 'no role yet'  } </p>}
        { showSkillLevel ?<div className={styles['form-input']}> <select multiple value = {skillLevel} id="skill_level" onChange ={(e)=>{setSkillLevel(e.target.value); setShowSl(false);setWantCustom(false)}}>
          <option value= "Beginner">Beginner</option>
          <option value="Some Experience">Some Experience</option>
          <option value="Intermediate">Intermediate</option>
          <option value = "Veteran">Veteran</option>
          </select>
        </div> : <p onDoubleClick={()=>setShowSl(true)}>Skill Level: {skillLevel ?  skillLevel : data.skill_level ? data.skill_level:'no skill level yet'}</p>}
        { show_Skills ?(<><input id="skills" type="text" onChange ={(e)=>{setSkills(e.target.value)}} placeholder={'Write down a list of what languages you know here.'} /><button onClick={()=>set_Show_Skills(false)}>y</button><br/></>) : <p onDoubleClick={()=>set_Show_Skills(true)}>Skills: {data.skills || skills ? data.skills || skills : 'no skills yet'}</p>}
        <button onClick={handleCloseForm}>Save changes</button>
      </div>
    </>
  );
}
