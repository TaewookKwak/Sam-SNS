import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './header.module.css'
const Header = ({ username }) => {
  return (
    <Link to={`/p/${username}`} className={styles.container}>
      <img
        className={styles.avatar}
        src={`/images/avatars/${username}.jpg`}
        alt={`${username} profile image`}
      />
      <p className={styles.username}>{username}</p>
    </Link>
  )
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Header
