import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import React, { useContext, useRef, useState } from 'react'
import styles from './photos.module.css'
import * as ROUTES from '../../../constants/routes'
import { useHistory } from 'react-router-dom'

import FirebaseContext from '../../../context/firebase'
import useUser from '../../../hooks/useUser'
const Photos = ({ photos, profile }) => {
  const [photo, setPhoto] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const photoRef = useRef()
  const history = useHistory()
  const { user: currentUser } = useUser()

  const onClick = () => {
    history.push(ROUTES.WRITE)
  }
  const onDelete = async (e) => {
    setPhoto(true)
    await firebase
      .firestore()
      .collection('photos')
      .doc(e.target.dataset.name)
      .delete()

    setPhoto(false)
    e.target.parentElement.classList.toggle('delete')
  }

  const onStory = (e) => {
    history.push({
      pathname: ROUTES.STORY,
      state: { photoid: e.target.dataset.photoid },
    })
  }

  return !photos ? (
    <Skeleton count={12} width={100} height={200} />
  ) : (
    <div className={styles.container}>
      {photos.map((item) => {
        return photo ? (
          <li
            className={styles.list}
            key={`${item.docId}-${item.userId}-${new Date()}`}
          >
            <img
              className={styles.photo}
              src={item.imageSrc}
              alt="story image"
              onClick={onStory}
              data-photoid={item.photoId}
            />
            {currentUser.userId === item.userId && (
              <div
                ref={photoRef}
                data-name={item.docId}
                onClick={onDelete}
                className={styles.iconDelete}
              >
                x
              </div>
            )}
          </li>
        ) : null
      })}

      {!photos || photos.length === 0 || !photo ? (
        <p>
          No Posts Yet.{' '}
          {profile.userId === currentUser.userId && (
            <span className={styles.shareAboutYou} onClick={onClick}>
              {' '}
              Share about you!
            </span>
          )}
        </p>
      ) : null}
    </div>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
}

export default Photos
