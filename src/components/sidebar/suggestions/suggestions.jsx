import React, { useContext, useEffect, useState } from 'react'
import SuggestedProfiles from './suggestedProfiles'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getAllUsersFromFirebase } from '../../../services/firebase'
import styles from './suggestions.module.css'
const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    async function getProfile() {
      const response = await getAllUsersFromFirebase(userId, following)
      setProfiles(response)
    }
    if (userId) getProfile()
  }, [userId])

  return !profiles ? (
    <Skeleton
      className={styles.skeleton}
      count={1}
      baseColor="#f3ecec"
      highlightColor="#d3cdcd"
    />
  ) : profiles.length > 0 ? (
    <div className={styles.container}>
      <p className={styles.title}>Suggestion for you</p>
      <ul className={styles.list}>
        {profiles.map((profile) => {
          return (
            <li className={styles.item} key={profile.docId}>
              <SuggestedProfiles
                username={profile.username}
                userId={userId}
                profileId={profile.userId}
                profileDocId={profile.docId}
                loggedInUserDocId={loggedInUserDocId}
                profile={profile}
              />
            </li>
          )
        })}
      </ul>
    </div>
  ) : null
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
}

export default Suggestions
