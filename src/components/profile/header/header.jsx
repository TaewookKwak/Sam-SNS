import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../../hooks/useUser'
import {
  getAllPhotosByUserIdFromFirebase,
  isUserFollowingProfile,
  updateFollowingProfileFollowedUserFromFirebase,
  updateLoggedInUserFollowingFromFirebase,
} from '../../../services/firebase'
const Header = ({
  photoCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    followers = [],
    following = [],
    fullName,
    username,
  },
  profile,
  followerCount,
  setFollowerCount,
}) => {
  const [isFollowedProfile, setIsFollowedProfile] = useState()
  const { user } = useUser()
  const handleFollow = async () => {
    setIsFollowedProfile((isFollowedProfile) => !isFollowedProfile)
    setFollowerCount({
      followerCount: isFollowedProfile ? followerCount - 1 : followerCount + 1,
    })
    await updateLoggedInUserFollowingFromFirebase(
      profileUserId,
      user.docId,
      isFollowedProfile,
    )
    await updateFollowingProfileFollowedUserFromFirebase(
      profileDocId,
      user.docId,
      isFollowedProfile,
    )
  }
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId,
      )
      setIsFollowedProfile(isFollowing)
    }
    if (user.username && profileUserId) isLoggedInUserFollowingProfile()
  }, [user.username, profileUserId])
  console.log('user', user)
  console.log('profile', profile)
  return (
    <div>
      <button
        onClick={handleFollow}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFollow()
          }
        }}
      >
        {isFollowedProfile ? `Unfollow` : `Follow`}
      </button>
      <img
        width={100}
        src={`/images/avatars/${username}.jpg`}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = '/images/avatars/default.png'
        }}
      />
      <p>fullName : {fullName}</p>

      <p>username : {username}</p>
      {followerCount || following.length || photoCount ? (
        <>
          <p>posts : {photoCount}</p>
          <p>followers : {followerCount}</p>
          <p>following : {following.length}</p>
        </>
      ) : (
        <Skeleton count={1} width={100} height={50} />
      )}
    </div>
  )
}
Header.propTypes = {
  photoCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    username: PropTypes.string,
    emailAddress: PropTypes.string,
  }).isRequired,
}
export default Header
