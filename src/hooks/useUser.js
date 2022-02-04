import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import React from 'react'
import { getUserFromFirebaseByUserId } from '../services/firebase'

function useUser(props) {
  const [activeUser, setActiveUser] = useState({})
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserFromFirebaseByUserId(user.uid)
      setActiveUser(response)
      //   console.log('response in useUser', response)
    }
    if (user?.uid) {
      getUserObjByUserId()
    }
  }, [user])
  return { user: activeUser }
}

function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}

export default useUser
