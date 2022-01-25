import React, { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import styles from './posting.module.css'

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

  const onPost = async (e) => {
    e.preventDefault()
    // 1.firebase에 저장
    return firebase
      .firestore()
      .collection('photos')
      .add({
        ...postInfo,
        caption: captionRef.current.value,
        dateCreated: Date.now(),
        imageSrc: file,
      })

    // 2.입력창 초기화
    // 3.go to Dashboard
  }

  const onFileUpload = async (e) => {
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
        <input type="file" onChange={onFileUpload} />
        <button disabled={file === '' || captionRef.current.value === ''}>
          Post
        </button>
      </form>
    </div>
  )
}

export default Posting
