import { useEffect, useState } from 'react'
import ProjectForm from "../../components/ProjectForm";
import styles from './index.module.css';

export default function CreateProject() {
<<<<<<< HEAD
  return <ProjectForm />;
=======

  const [projectExists, setProjectExists] = useState(false)
  const [data, setData] = useState({})

  async function getProjectMember() {
    const response = await fetch(`http://localhost:8000/teammember/${sessionStorage.getItem('user_id')}`)
    const responseData = await response.json()
    setData(JSON.parse(JSON.stringify(responseData)))
  }

  useEffect(() => {
    getProjectMember()
  }, [])

  useEffect(() => {
    console.log(data)
    if (data[0]) {
      setProjectExists(true)
      console.log('data true ' + data[0])
    } else {
      setProjectExists(false)
      console.log('Not Found')
      console.log('data false ' + data[0])
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
>>>>>>> dev
}
