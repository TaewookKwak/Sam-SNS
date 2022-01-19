import React, { useEffect, useState } from 'react'
import {
  getAllPhotosFromFirebase,
  getAllUsersFromFirebase,
} from '../services/firebase'

const useProfile = (userId) => {
  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    async function getProfile() {
      const response = await getAllUsersFromFirebase()
      const response2 = await getAllPhotosFromFirebase()
      console.log('response in useProfile', response, response2)
      setUsers(response)
      setPhotos(response2)
    }
    if (userId) getProfile()
  }, [userId])
  return users
}

export default useProfile
