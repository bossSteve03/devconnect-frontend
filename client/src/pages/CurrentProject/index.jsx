import { useState, useEffect } from "react"
import { FirebaseChat } from "../../components"
import styles from './index.module.css'

export default function CurrentProject() {

  const [projectExists, setProjectExists] = useState(false)
  const [data, setData] = useState({})
  
  async function getProjectMember() {
    const response = await fetch(`http://localhost:8000/teammember/${sessionStorage.getItem('project_id')}`)
    console.log(response.status)
    const responsedata = await response.json()
    console.log("info got!", responsedata)
    setData(responsedata[0])
  }

  useEffect(() => {
    getProjectMember()
  }, [])

  useEffect(() => {
    console.log(data + 'current team data')
      if (data !== null) {
        setProjectExists(true)
        console.log(data + 'project exists')
      } else {
        setProjectExists(false)
        console.log('Not Found')
      }
  }, [data])

  return (
    <>
    {
    projectExists
    ?
    <div className={styles["page-container"]}>
      <div className={styles["team-container"]}>
      <p>team</p>
      </div>
      <div className={styles["left-side"]}>
        <div className={styles["tasks-container"]}>
        <p>tasks</p>
        </div>
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
