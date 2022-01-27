import React, { useEffect } from 'react'
import useUser from '../../hooks/useUser'
import Suggestions from './suggestions/suggestions'
import styles from './sidebar.module.css'
import User from './user/user'
const Sidebar = () => {
  const {
    user: { imageUrl = '', docId, fullName, username, userId, following },
  } = useUser()
  // console.log('user in sidebar', fullName, username, userId)
  return (
    <div className={styles.container}>
      <User imageUrl={imageUrl} fullName={fullName} username={username} />
      <Suggestions
        userId={userId}
        username={username}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  )
}

export default Sidebar

Sidebar.whyDidYouRender = true
