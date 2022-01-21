import React from 'react'
import PropTypes from 'prop-types'
import styles from './footer.module.css'
const Footer = ({ username, caption }) => {
  return (
    <div className={styles.container}>
      <span className={styles.username}>{username}</span>
      <span className={styles.caption}>{caption}</span>
    </div>
  )
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default Footer
