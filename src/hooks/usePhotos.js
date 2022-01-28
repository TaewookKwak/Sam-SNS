import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import {
  getPhotosFromFirebase,
  getUserFromFirebaseByUserId,
} from '../services/firebase'

const usePhotos = () => {
  const [photos, setPhotos] = useState(null)
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)

  useEffect(() => {
    if (userId) {
      async function getTimelinePhotos() {
        const [{ following = '' }] = await getUserFromFirebaseByUserId(userId)
        let followedUserPhotos = []
        if (following.length > 0) {
          followedUserPhotos = await getPhotosFromFirebase(userId, following)
        }
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos)
      }
      getTimelinePhotos()
    }
  }, [userId])
  return photos
}

export default usePhotos
