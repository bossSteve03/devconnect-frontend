import { useState, useEffect } from "react"
import { FirebaseChat } from "../../components"
import styles from './index.module.css'

export default function CurrentProject() {

  const [projectExists, setProjectExists] = useState(false)
  const [data, setData] = useState({})
  
  async function getProjectMember() {
    try{
      console.log("id !", sessionStorage.getItem('project_id'))
      if (sessionStorage.getItem('project_id') === null){
        setProjectExists(false)
      }
      else {
        const response = await fetch(`http://localhost:8000/teammember/${sessionStorage.getItem('project_id')}`)
        console.log(response.status)
        const responsedata = await response.json()
        setProjectExists(true)
        setData(responsedata[0])
      }
    }
    catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    getProjectMember()
  }, [])

  return (
    <>
    {
    projectExists
    ?
    <div className={styles["page-container"]}>
      <div className={styles["team-container"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      </div>
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
