import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  updateFollowingProfileFollowedUserFromFirebase,
  updateLoggedInUserFollowingFromFirebase,
} from '../../../services/firebase'
const Others = ({
  username,
  userId,
  profileId,
  suggestedProfileDocId,
  loggedInUserDocId,
}) => {
  const [followed, setfollowed] = useState(false)
  async function handleFollowUser() {
    await updateLoggedInUserFollowingFromFirebase(profileId, loggedInUserDocId)
    await updateFollowingProfileFollowedUserFromFirebase(
      suggestedProfileDocId,
      userId,
    )

    setfollowed(true)
  }
  return !followed ? (
    <div>
      <img
        width="50px"
        src={`/images/avatars/${username}.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = '/images/avatars/default.png'
        }}
      />
      <Link to={`/p/${username}`}>
        <p>{username}</p>
      </Link>
      <button type="button" onClick={handleFollowUser}>
        Follow
      </button>
    </div>
  ) : null
  //   return (
  //     <div>
  //       <img
  //         width="50px"
  //         src={`/images/avatars/${username}.jpg`}
  //         onError={({ currentTarget }) => {
  //           currentTarget.onerror = null // prevents looping
  //           currentTarget.src = '/images/avatars/default.png'
  //         }}
  //       />
  //       <p>{username}</p>
  //     </div>
  //   )
}

Others.propTypes = {
  username: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
}

export default Others
