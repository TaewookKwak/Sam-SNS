import React from 'react'
import useUser from '../../hooks/useUser'
import Suggestions from './suggestions/suggestions'
import styles from './sidebar.module.css'
import User from './user/user'
const Sidebar = () => {
  const {
    user: { imageUrl, docId, fullName, username, userId, following },
    user,
  } = useUser()

  // console.log('user in sidebar', fullName, username, userId)
  return !isEmptyObj(user) ? (
    <div className={styles.container}>
      <User imageUrl={imageUrl} fullName={fullName} username={username} />
      <Suggestions
        userId={userId}
        username={username}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  ) : null
}
function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}
export default Sidebar
