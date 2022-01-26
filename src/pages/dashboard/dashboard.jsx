import React, { useContext, useEffect, useState } from 'react'
import Write from '../../components/footer/write'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import Timeline from '../../components/timeline/timeline'
import styles from './dashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [isSideBarHidden, setIsSideBarHidden] = useState(true)
  const onClick = () => {
    setIsSideBarHidden((prev) => !prev)
  }

  useEffect(() => {
    document.title = 'Dashboard - Sams SNS'
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.timeline}>
          <Timeline />
        </section>
        <section
          className={`${styles.sidebar} ${isSideBarHidden && styles.hidden}`}
        >
          <Sidebar />
        </section>

        <section className={styles.write}>
          <Write />
        </section>
        <div onClick={onClick} className={styles.icon}>
          <FontAwesomeIcon icon={faUsers} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
