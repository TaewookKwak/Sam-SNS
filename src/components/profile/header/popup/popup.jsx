import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import FirebaseContext from '../../../../context/firebase'
import UserContext from '../../../../context/user'
import { getUserFromFirebaseByUserId } from '../../../../services/firebase'
import styles from './popup.module.css'
const Popup = ({ trigger, setTrigger, setImage, children, image }) => {
  const [userDocId, setUserDocId] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)
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

  const onSubmit = async (e) => {
    e.preventDefault()

    await firebase.firestore().collection('users').doc(userDocId).update({
      imageUrl: image,
    })
    setTrigger((prev) => !prev)
    setImage('')
  }
  useEffect(async () => {
    const result = await getUserFromFirebaseByUserId(user.uid)
    const docId = result[0].docId
    setUserDocId(docId)
    console.log(docId)
  }, [user])

  return trigger ? (
    <div className={styles.popup}>
      <div className={styles.inner}>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onUploadFile} />
          <button disabled={!image}>Submit</button>
        </form>

        {children}
      </div>
    </div>
  ) : null
}

export default Popup
