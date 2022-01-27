import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './header.module.css'
import { getUserByUsername } from '../../../services/firebase'
const Header = ({ username }) => {
  const [profile, setProfile] = useState(null)
  useEffect(async () => {
    const profile = await getUserByUsername(username)
    setProfile(profile[0])
  }, [username])
  return profile ? (
    <Link to={`/p/${username}`} className={styles.container}>
      <img
        className={styles.avatar}
        src={profile.imageUrl || '/images/avatars/default.png'}
        alt={`${username} profile image`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = '/images/avatars/default.png'
        }}
      />
      <p className={styles.username}>{username}</p>
    </Link>
  ) : null
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Header
