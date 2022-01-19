import React, { useContext, useEffect, useState } from 'react'
import useProfile from '../../../hooks/useProfile'
import Others from './others'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getAllUsersFromFirebase } from '../../../services/firebase'

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    async function getProfile() {
      const response = await getAllUsersFromFirebase(userId, following)
      setProfiles(response)
      console.log(response, userId)
    }
    if (userId) getProfile()
  }, [userId])

  return !profiles ? (
    <Skeleton count={1} />
  ) : profiles.length > 0 ? (
    <div>
      <p>Suggestion for you</p>
      <ul>
        {profiles.map((profile) => {
          return (
            <li key={profile.docId}>
              <Others
                username={profile.username}
                userId={userId}
                profileId={profile.userId}
                suggestedProfileDocId={profile.docId}
                loggedInUserDocId={loggedInUserDocId}
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
