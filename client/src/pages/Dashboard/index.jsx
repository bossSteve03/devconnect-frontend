import { useState, useEffect } from 'react'
import { HasName, NeedsName, HasSkillLevel, NeedsSkillLevel, HasSkills, NeedsSkills, HasRole, NeedsRole } from '../../components/DashboardComponents'
import styles from './index.module.css'

export default function Dashboard() {

  const [data, setData] = useState({});
  const [nameExists, setNameExists] = useState(false);
  const [skillLevelExists, setSkillLevelExists] = useState(false);
  const [skillsExists, setSkillsExists] = useState(false);
  const [roleExists, setRoleExists] = useState(false);

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
  }

  function checkDetails() {
    if(data.name !== '' && data.name !== null){
      setNameExists(true)
    }
    if(data.role !== '' && data.role !== null){
      setNameExists(true)
    }
    if(data.skill_level !== '' && data.skill_level !== null){
      setNameExists(true)
    }
    if(data.skills !== '' && data.skills !== null){
      setNameExists(true)
    }
  }


  useEffect(() => {
    handleData();
    checkDetails();
  }, []);


  return (
    <div>
    {nameExists ? <HasName /> : <NeedsName />}
    {skillLevelExists ? <HasSkillLevel /> : <NeedsSkillLevel />}
    {skillsExists ? <HasSkills /> : <NeedsSkills />}
    {roleExists ? <HasRole /> : <NeedsRole />}
    </div>
  )
}
