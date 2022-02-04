import React from 'react'
import PropTypes from 'prop-types'
import styles from './footer.module.css'
import { formatDistance } from 'date-fns'
const Footer = ({ username, caption, posted }) => {
  return (
    <div className={styles.container}>
      <span className={styles.username}>{username}</span>
      <span className={styles.caption}>{caption}</span>
      <p className={styles.date}>
        {formatDistance(posted, new Date(), { addSuffix: true })}
      </p>
    </div>
  )
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default Footer
