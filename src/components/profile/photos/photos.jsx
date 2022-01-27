import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import React, { useRef, useState } from 'react'
import styles from './photos.module.css'
import * as ROUTES from '../../../constants/routes'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react/cjs/react.development'
import FirebaseContext from '../../../context/firebase'
import useUser from '../../../hooks/useUser'
const Photos = ({ photos, profile }) => {
  const [photo, setPhoto] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const photoRef = useRef()
  const history = useHistory()
  const { user: currentUser } = useUser()

  console.log(profile)

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
  return !photos ? (
    <Skeleton count={12} width={100} height={200} />
  ) : (
    <div className={styles.container}>
      {photos.map((item) => {
        return photo ? (
          <>
            <li className={styles.list} key={`${item.docId}-${item.userId}`}>
              <img className={styles.photo} src={item.imageSrc} alt="" />
              {currentUser.userId === item.userId && (
                <div
                  ref={photoRef}
                  data-name={item.docId}
                  onClick={onDelete}
                  className={styles.iconDelete}
                >
                  ❌
                </div>
              )}
            </li>
          </>
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
