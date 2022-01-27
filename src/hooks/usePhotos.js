import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import {
  getPhotosFromFirebase,
  getUserFromFirebaseByUserId,
} from '../services/firebase'

const usePhotos = () => {
  const [photos, setPhotos] = useState(null)
  const {
    user: { uid },
  } = useContext(UserContext)

  useEffect(() => {
    if (uid) {
      async function getTimelinePhotos() {
        const [{ following = '' }] = await getUserFromFirebaseByUserId(uid)
        let followedUserPhotos = []
        if (following.length > 0) {
          followedUserPhotos = await getPhotosFromFirebase(uid, following)
        }
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos)
      }
      getTimelinePhotos()
    }
  }, [uid])
  return photos
}

export default usePhotos
