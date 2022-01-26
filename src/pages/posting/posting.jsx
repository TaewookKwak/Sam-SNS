import React, { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import styles from './posting.module.css'
import * as ROUTES from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { postPhotoWithPhotosInfo } from '../../services/firebase'

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
  const captionRef = useRef()
  const history = useHistory()

  const onPost = async (e) => {
    e.preventDefault()
    // 1.firebase에 저장
    await postPhotoWithPhotosInfo(postInfo, captionRef.current.value, file)
    // 3.go to Dashboard
    history.push(ROUTES.DASHBOARD)
  }

  const onUploadFile = async (e) => {
    let file = e.target.files[0]

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
      <form action="" onSubmit={onPost}>
        <input
          type="text"
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
        <input type="file" onChange={onUploadFile} />
        <button disabled={file === '' || captionRef.current.value === ''}>
          Post
        </button>
      </form>
    </div>
  )
}

export default Posting
