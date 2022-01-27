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
import styles from './header.module.css'

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
    <div className={styles.container}>
      {!profile && !user ? (
        <Skeleton
          count={1}
          baseColor="white"
          highlightColor="#d3cdcd"
          className={styles.skeleton}
        />
      ) : (
        <div className={styles.profileInfo}>
          <div className={styles.profileImage}>
            <img
              className={styles.image}
              src={profile.imageUrl || '/images/avatars/default.png'}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = '/images/avatars/default.png'
              }}
            />
            {user.userId === profileUserId && (
              <button
                className={styles.btnEditImage}
                onClick={() => setTrigger((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faUserEdit} />
              </button>
            )}
          </div>
          <p className={styles.fullName}>{fullName}</p>
          <p className={styles.username}>{username}</p>
          {user.userId !== profileUserId && (
            <button
              className={styles.btnFollow}
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
        </div>
      )}

      {followerCount !== undefined ||
      following.length !== undefined ||
      photoCount !== undefined ? (
        <div className={styles.profileRestInfo}>
          <p className={styles.follwersCount}>{followerCount} followers</p>
          <p className={styles.postsCount}>{photoCount} posts</p>
          <p className={styles.followingCount}>{following.length} following</p>
        </div>
      ) : (
        <Skeleton
          count={1}
          baseColor="white"
          highlightColor="#d3cdcd"
          className={styles.skeleton}
        />
      )}
      <Popup
        trigger={trigger}
        setTrigger={setTrigger}
        setImage={setImage}
        image={image}
      >
        <div className={styles.previewContainer}>
          {image && <img className={styles.preview} src={image} alt="" />}
        </div>
        <button
          className={styles.btnClose}
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
