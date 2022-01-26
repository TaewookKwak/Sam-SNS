import React, { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import styles from './posting.module.css'
import * as ROUTES from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { postPhotoWithPhotosInfo } from '../../services/firebase'
import Skeleton from 'react-loading-skeleton'

const Posting = () => {
  const iniitailPost = {
    caption: '',
    comments: [],
    dateCreated: 0,
    imageSrc: '',
    likes: [],
    photoId: 0,
    userId: '',
    userLatitude: '',
    userLongitude: '',
  }
  const { user } = useContext(UserContext)
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const [postInfo, setPostInfo] = useState(iniitailPost)
  const [file, setFile] = useState('')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const captionRef = useRef()
  const fileClickRef = useRef()
  const history = useHistory()

  const onPost = async (e) => {
    e.preventDefault()
    // 1.firebase에 저장
    await postPhotoWithPhotosInfo(postInfo, captionRef.current.value, file)
    // 3.go to Dashboard
    history.push(ROUTES.DASHBOARD)
  }

  const onClick = () => {
    fileClickRef.current.click()
  }

  const onClose = () => {
    history.push(ROUTES.DASHBOARD)
    setCaption('')
    setFile('')
  }

  const onUploadFile = async (e) => {
    let file = e.target.files[0]
    setLoading(true)
    await firebase
      .storage()
      .ref()
      .child(`images/${file.name}`)
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          setFile(url)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }

  useEffect(() => {
    setPostInfo((prev) => ({
      ...prev,
      photoId: `${user.displayName}-${Date.now()}`,
      userId: user.uid,
    }))
  }, [])

  return (
    <div className={styles.container}>
      <form className={styles.form} action="" onSubmit={onPost}>
        <input
          ref={fileClickRef}
          className={styles.inputFile}
          type="file"
          onChange={onUploadFile}
        />
        <div className={styles.imageBox} onClick={onClick}>
          {file ? <img className={styles.image} src={file} /> : <p>Click</p>}
          {loading ? <Skeleton count={1} /> : null}
        </div>
        <input
          className={styles.inputText}
          type="text"
          placeholder="please fill your message"
          ref={captionRef}
          onKeyUp={() => {
            let Query = captionRef.current.value.toLowerCase()
            setTimeout(() => {
              if (Query === captionRef.current.value.toLowerCase()) {
                setCaption(Query)
                console.log(Query)
              }
            }, 500)
          }}
        />

        <button
          className={styles.btnPost}
          disabled={file === '' || captionRef.current.value === ''}
        >
          Post
        </button>
      </form>
      <button className={styles.btnClose} onClick={onClose}>
        close
      </button>
    </div>
  )
}

export default Posting
