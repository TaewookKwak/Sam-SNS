import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  updateFollowingProfileFollowedUserFromFirebase,
  updateLoggedInUserFollowingFromFirebase,
} from '../../../services/firebase'
import styles from './suggestedProfiles.module.css'
const SuggestedProfiles = ({
  profile,
  username,
  userId,
  profileId,
  profileDocId,
  loggedInUserDocId,
}) => {
  const [followed, setfollowed] = useState(false)
  async function handleFollowUser() {
    await updateLoggedInUserFollowingFromFirebase(
      profileId,
      loggedInUserDocId,
      false,
    )
    await updateFollowingProfileFollowedUserFromFirebase(
      profileDocId,
      userId,
      false,
    )
    setfollowed(true)
    window.location.reload()
  }
  return !followed ? (
    <div className={styles.container}>
      <div className={styles.user}>
        <img
          src={profile.imageUrl || '/images/avatars/default.png'}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = '/images/avatars/default.png'
          }}
          className={styles.avatar}
        />
        <Link to={`/p/${username}`}>
          <p className={styles.username}>{username}</p>
        </Link>
      </div>

      <button
        className={styles.btnFollow}
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null
}

SuggestedProfiles.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  profileId: PropTypes.string,
  profileDocId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
}

export default SuggestedProfiles
