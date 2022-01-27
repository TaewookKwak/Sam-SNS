import React, { useState, useEffect } from 'react'
import { getUserByUsername } from '../../services/firebase'
import * as ROUTES from '../../constants/routes'
import { useHistory, useParams } from 'react-router-dom'
import Header from '../../components/header/header'
import UserProfile from '../../components/profile/userProfile'
import styles from './profile.module.css'
const Profile = () => {
  let { username } = useParams()
  const [user, setUser] = useState({})
  const [userExists, setUserExists] = useState(false)
  const history = useHistory()

  useEffect(() => {
    document.title = 'Profile - Sams SNS'
  }, [])

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username)
      console.log('useruseruseruser', user)
      if (user.length > 0) {
        setUser(user[0])
        setUserExists(true)
      } else {
        setUserExists(false)
        history.push(ROUTES.NOT_FOUND)
      }
    }

    username && checkUserExists()
  }, [username, history])

  return userExists ? (
    <div className={styles.container}>
      <Header />
      <UserProfile user={user} />
    </div>
  ) : null
}

export default Profile
