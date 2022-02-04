import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/usePhotos'
import Post from '../post/post'
import styles from './timeline.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const Timeline = () => {
  const photos = usePhotos()
  const [update, setUpdate] = useState(false)
  const handleRefresh = () => {
    window.location.reload()
  }
  return !photos ? (
    <Skeleton
      className={styles.skeleton}
      count={4}
      baseColor="#f3ecec"
      highlightColor="#d3cdcd"
    />
  ) : photos?.length > 0 ? (
    <div className={styles.container}>
      <div className={styles.refresh} onClick={handleRefresh}>
        <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
      </div>
      {photos.map((photo) => {
        return <Post key={photo.docId} content={photo} setUpdate={setUpdate} />
      })}
    </div>
  ) : (
    <p>Follow people to see how they are doing!</p>
  )
}

export default Timeline
