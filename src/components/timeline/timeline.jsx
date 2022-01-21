import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/usePhotos'
import Post from '../post/post'
import styles from './timeline.module.css'

const Timeline = () => {
  const photos = usePhotos()
  console.log('photos', photos)
  return !photos ? (
    <Skeleton
      className={styles.skeleton}
      count={4}
      baseColor="#f3ecec"
      highlightColor="#d3cdcd"
    />
  ) : photos?.length > 0 ? (
    <div className={styles.container}>
      {photos.map((photo) => {
        return <Post key={photo.docId} content={photo} />
      })}
    </div>
  ) : (
    <p>Follow people to see how they are doing!</p>
  )
}

export default Timeline
