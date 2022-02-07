import React, { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from '../../../../context/firebase'
import UserContext from '../../../../context/user'
import { getUserFromFirebaseByUserId } from '../../../../services/firebase'
import styles from './popup.module.css'
const Popup = ({ trigger, setTrigger, setImage, children, image }) => {
  const [userDocId, setUserDocId] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)

  const fileRef = useRef()
  const onUploadFile = async (e) => {
    let file = e.target.files[0]
    await firebase
      .storage()
      .ref()
      .child(`images/${file.name}`)
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          setImage(url)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onClick = () => {
    fileRef.current.click()
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    await firebase.firestore().collection('users').doc(userDocId).update({
      imageUrl: image,
    })
    setTrigger((prev) => !prev)
    setImage('')
    window.location.reload()
  }
  useEffect(async () => {
    const result = await getUserFromFirebaseByUserId(user.uid)
    const docId = result[0].docId
    setUserDocId(docId)
    return () => setUserDocId('')
  }, [user])

  return trigger ? (
    <div className={styles.popup}>
      <div className={styles.inner}>
        {children}
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            ref={fileRef}
            className={styles.file}
            type="file"
            onChange={onUploadFile}
          />
          <button className={styles.btnSubmit} disabled={!image}>
            Submit
          </button>
        </form>
        <div onClick={onClick} className={styles.uploader}></div>
      </div>
    </div>
  ) : null
}

export default Popup
