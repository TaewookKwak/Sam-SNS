import React, { memo } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './user.module.css'
import 'react-loading-skeleton/dist/skeleton.css'

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton
      className={styles.skeleton}
      count={2}
      baseColor="#f3ecec"
      highlightColor="#d3cdcd"
    />
  ) : (
    <Link to={`/p/${username}`}>
      <img
        className={styles.avatar}
        src={`/images/avatars/${username}.jpg`}
        alt=""
      />
      <p>{fullName}</p>
      <p>{username}</p>
    </Link>
  )
User.whyDidYouRender = true
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
}

export default memo(User)
