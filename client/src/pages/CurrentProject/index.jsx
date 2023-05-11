import { useState, useEffect } from "react"
import { FirebaseChat } from "../../components"
import styles from './index.module.css'

export default function CurrentProject() {

  const [projectExists, setProjectExists] = useState(false)
  const [data, setData] = useState([])
  const [projectInfo, setProjectInfo] = useState({})
  const [displayData, setDisplayData] = useState(false)

  const getprojectinfo = async()=>{
    try{
      const get = await fetch(`http://localhost:8000/project/getbyid/${sessionStorage.getItem("project_id")}`)
      const data = await get.json()
      setProjectInfo(data)
      return true
    }
    catch (e){
      console.log(e)
      return false
    }
  }
  async function getProjectMember() {
    const check =await getprojectinfo()
    try{
      if (sessionStorage.getItem('project_id') == 0){
        setProjectExists(false)
      }
      else {
        const response = await fetch(`http://localhost:8000/teammember/${sessionStorage.getItem('project_id')}`)
        const responsedata = await response.json()
        setProjectExists(true)
        setData(responsedata)
      }
    }
    catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    getProjectMember()
  }, [])
  useEffect(()=>{
    if (data.length !== 0){
      data.map((e)=>{
        console.log("name",e.name)
        console.log("role",e.role)
      })
      setDisplayData(true)
    }
    else {
      setDisplayData(false)
    }
},[data])
  return (
    <>
    {
    projectExists
    ? 
    <div className={styles["page-container"]}>
      {displayData ?
      <div className={styles["team-container"]}>
      <h1>{projectInfo.title}</h1>
      <h1>{projectInfo.description}</h1>
      <h1>{projectInfo.duration}</h1>
      {data.map((e) =>{
        return(
          <div key ={e.id}>
        <h1>{e.name}</h1>
        <p1>Role: {e.role}</p1>
        </div>
          )
      })}
      </div>
      : <h1>loading . . .</h1>}
      <div className={styles['left-side']}>
        <div className={styles["chat-container"]}>
          <FirebaseChat />
        </div>
      </div>
    </div>
    :
    <div className={styles["no-project-yet"]}>
      <p className={styles["no-project-text"]}>You're not a part of any projects yet. Go to Search Projects to apply to one or go to Create Project to create your own.</p>
    </div>
    }
    </>
  )
}
