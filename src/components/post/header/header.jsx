import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './header.module.css'
import { getUserByUsername } from '../../../services/firebase'
import { format } from 'date-fns'
const Header = ({ username, posted }) => {
  const [profile, setProfile] = useState(null)
  useEffect(async () => {
    const profile = await getUserByUsername(username)
    setProfile(profile[0])
    return () => setProfile(null)
  }, [username])
  return profile ? (
    <div className={styles.header}>
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

      <p className={styles.posted}>{format(posted, 'yyyy.MM.dd')}</p>
    </div>
  ) : null
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Header
