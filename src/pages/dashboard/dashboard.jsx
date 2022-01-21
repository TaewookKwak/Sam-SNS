import React, { useEffect } from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import Timeline from '../../components/timeline/timeline'
import styles from './dashboard.module.css'
const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Sams SNS'
  }, [])
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <section className={styles.timeline}>
          <Timeline />
        </section>
        <section className={styles.sidebar}>
          <Sidebar />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
