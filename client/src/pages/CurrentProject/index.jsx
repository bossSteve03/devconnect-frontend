import { useState, useEffect } from "react"
import { FirebaseChat } from "../../components"
import styles from './index.module.css'

export default function CurrentProject() {

  const [projectExists, setProjectExists] = useState(false)

  async function getProjectMember() {
    const response = fetch(`http://localhost:8000/teammember/getProjectMemberByUsername/${sessionStorage.getItem('username')}`)
    if (response.ok) {
      setProjectExists(true)
    } else {
      setProjectExists(false)
    }
  }

  useEffect(() => {
    getProjectMember()
  }, [])

  return (
    <>
    {projectExists
    ?
    <div className={styles["page-container"]}>
      <div className={styles["tasks-container"]}>

      </div>
      <div className={styles["team-container"]}>

      </div>
      <div className={styles["chat-container"]}>
        <FirebaseChat />
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
