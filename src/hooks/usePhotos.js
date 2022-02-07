import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import {
  getPhotosFromFirebase,
  getUserFromFirebaseByUserId,
} from '../services/firebase'

const usePhotos = () => {
  const [photos, setPhotos] = useState(null)
  const {
    user: { uid: userId },
  } = useContext(UserContext)
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserFromFirebaseByUserId(userId)
      console.log(following)
      let followedUserPhotos = []
      if (following.length > 0) {
        followedUserPhotos = await getPhotosFromFirebase(userId, following)
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhotos)
    }
    if (userId) {
      getTimelinePhotos()
    }
  }, [userId])
  return photos
}

export default usePhotos
