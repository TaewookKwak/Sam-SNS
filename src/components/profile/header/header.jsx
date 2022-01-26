import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../../hooks/useUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import {
  getAllPhotosByUserIdFromFirebase,
  isUserFollowingProfile,
  updateFollowingProfileFollowedUserFromFirebase,
  updateLoggedInUserFollowingFromFirebase,
} from '../../../services/firebase'
import Popup from './popup/popup'

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
  const [trigger, setTrigger] = useState(false)
  const [image, setImage] = useState('')
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
  console.log(profile)

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

  return (
    <div>
      {user.userId !== profileUserId && (
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
      )}
      <div>
        <img
          width={100}
          src={profile.imageUrl || '/images/avatars/default.png'}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = '/images/avatars/default.png'
          }}
        />
        {user.userId === profileUserId && (
          <button onClick={() => setTrigger((prev) => !prev)}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        )}
      </div>

      <p>fullName : {fullName}</p>

      <p>username : {username}</p>
      {followerCount !== undefined ||
      following.length !== undefined ||
      photoCount !== undefined ? (
        <>
          <p>posts : {photoCount}</p>
          <p>followers : {followerCount}</p>
          <p>following : {following.length}</p>
        </>
      ) : (
        <Skeleton count={1} width={100} height={50} />
      )}
      <Popup
        trigger={trigger}
        setTrigger={setTrigger}
        setImage={setImage}
        image={image}
      >
        {image && <img src={image} alt="" width={100} />}
        <button
          onClick={() => {
            setTrigger((prev) => !prev)
            setImage('')
          }}
        >
          close
        </button>
      </Popup>
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
