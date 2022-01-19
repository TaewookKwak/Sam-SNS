import React, { useEffect } from 'react'
import useUser from '../../hooks/useUser'
import Suggestions from './suggestions/suggestions'
import styles from './sidebar.module.css'
import User from './user/user'
const Sidebar = () => {
  const {
    user: { fullName, username, userId },
  } = useUser()
  console.log('user in sidebar', fullName, username, userId)
  return (
    <div>
      <User fullName={fullName} username={username} userId={userId} />
      <Suggestions fullName={fullName} username={username} userId={userId} />
    </div>
  )
}

export default Sidebar
