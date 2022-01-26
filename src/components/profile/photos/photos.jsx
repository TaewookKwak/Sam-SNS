import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import React from 'react'
import styles from './photos.module.css'

const Photos = ({ photos }) => {
  return !photos ? (
    <Skeleton count={12} width={100} height={200} />
  ) : (
    <div className={styles.container}>
      {photos.map((item) => {
        return (
          <li className={styles.list} key={`${item.docId}-${item.userId}`}>
            <img className={styles.photo} src={item.imageSrc} alt="" />
          </li>
        )
      })}
      {!photos || (photos.length === 0 && <p>No Posts Yet</p>)}
    </div>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
}

export default Photos
