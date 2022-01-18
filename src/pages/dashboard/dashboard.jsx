import React, { useEffect } from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import Timeline from '../../components/timeline/timeline'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Sams SNS'
  }, [])
  return (
    <div>
      <Header />
      <Timeline />
      <Sidebar />
    </div>
  )
}

export default Dashboard
