import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import { getPhotosByUsername } from '../../services/firebase'
import Header from './header/header'
import Photos from './photos/photos'

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  }
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUsername(user.username)
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      })
    }
    getProfileInfoAndPhotos()
  }, [user])

  return (
    <>
      {user ? (
        <>
          <Header
            photoCount={photosCollection ? photosCollection.length : 0}
            profile={profile}
            followerCount={followerCount}
            setFollowerCount={dispatch}
          />
          <Photos photos={photosCollection} profile={profile} />
        </>
      ) : null}
    </>
  )
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserProfile
