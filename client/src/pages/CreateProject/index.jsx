import { useEffect, useState } from 'react'
import ProjectForm from "../../components/ProjectForm";
import styles from './index.module.css';

export default function CreateProject() {

  const [projectExists, setProjectExists] = useState(false)
  const [data, setData] = useState({})

  async function getProjectMember() {
    const response = await fetch(`http://localhost:8000/teammember/getProjectMemberByUsername/${sessionStorage.getItem('username')}`)
    const responseData = await response.json()
    setData(responseData)
  }

  useEffect(() => {
    getProjectMember()
  }, [])

  useEffect(() => {
    if (data) {
      setProjectExists(true)
    } else {
      setProjectExists(false)
      console.log('Not Found')
    }
  }, [data])

  return (
    <div className={styles['page-container']}>
    {
      projectExists
      ?
      <div className={styles["no-can-do"]}>
        <h1 className={styles["cannot-create-project-h1"]}>Already in project!</h1>
        <p className={styles["cannot-create-project-p"]}>You're already in a project and therefore cannot join any more as we are limited to 1 project per user. Sorry for any inconveniences.</p>
      </div>
      :
      <ProjectForm />
    }
    </div>
  )
}
