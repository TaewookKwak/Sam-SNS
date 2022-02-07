import React, { useContext, useState } from 'react'
import FirebaseContext from '../../../context/firebase'
import UserContext from '../../../context/user'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import styles from './action.module.css'

const Action = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)
  const [toggleLiked, setToggleLiked] = useState(likedPhoto)
  const [likes, setLikes] = useState(totalLikes)
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked)
    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      })

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handleToggleLiked}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleToggleLiked()
          }
        }}
        className={styles.btnHeart}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={`${styles.heart} ${getHeartStyle(toggleLiked)}`}
        />
      </button>
      <button
        onClick={handleFocus}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleFocus()
          }
        }}
        className={styles.btnComments}
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      <div>
        <p className={styles.like}>
          {likes <= 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </div>
  )
}

function getHeartStyle(toggleLiked) {
  switch (toggleLiked) {
    case true:
      return styles.fill
    case false:
      return styles.empty
    default:
      throw new Error(`unknow theme`)
  }
}

Action.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
}

export default Action
