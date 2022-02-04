import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Action from '../../components/post/action/action'
import Comment from '../../components/post/comment/comment'
import Footer from '../../components/post/footer/footer'
import Header from '../../components/post/header/header'
import Image from '../../components/post/image/image'
import { getPhotoByPhotoIdFromFirebase } from '../../services/firebase'
import styles from './story.module.css'
function Story(props) {
  const [photoId, setPhotoId] = useState(null)
  const [photo, setPhoto] = useState(null)
  const location = useLocation()
  const commentInput = useRef(null)
  const handleFocus = () => {
    commentInput.current.focus()
  }
  useEffect(() => {
    if (!location) return
    setPhotoId(location.state.photoid)
  }, [location])

  useEffect(() => {
    const getPhotobyPhotoId = async () => {
      const photo = await getPhotoByPhotoIdFromFirebase(photoId)
      setPhoto(photo)
      console.log(photo)
    }
    if (photoId) getPhotobyPhotoId()
  }, [photoId])

  return photo ? (
    <div className={styles.container}>
      <Header username={photo.username} />
      <Image src={photo.imageSrc} caption={photo.caption} />
      <div className={styles.containerOfRest}>
        <Action
          docId={photo.docId}
          totalLikes={photo.likes.length}
          likedPhoto={photo.userLikedPhoto}
          handleFocus={handleFocus}
        />
        <Footer
          username={photo.username}
          caption={photo.caption}
          posted={photo.dateCreated}
        />
        <Comment
          docId={photo.docId}
          comments={photo.comments}
          commentInput={commentInput}
        />
      </div>
    </div>
  ) : null
}

export default Story
