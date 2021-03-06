import React, { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './user.module.css'
import 'react-loading-skeleton/dist/skeleton.css'

const User = ({ username, fullName, imageUrl }) =>
  !username || !fullName ? (
    <Skeleton
      className={styles.skeleton}
      count={1}
      baseColor="#f3ecec"
      highlightColor="#d3cdcd"
    />
  ) : (
    <div className={styles.userInfo}>
      <Link to={`/p/${username}`} className={styles.link}>
        <img
          className={styles.avatar}
          src={imageUrl || '/images/avatars/default.png'}
          alt="user image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = '/images/avatars/default.png'
          }}
        />
        <div className={styles.names}>
          <p className={styles.username}>{username}</p>
          <p className={styles.fullname}>{fullName}</p>
        </div>
      </Link>
    </div>
  )
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
}

export default memo(User)
