import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const isUserExisted = result.docs.length > 0
  console.log('isUserExisted', isUserExisted)
  return isUserExisted
}

export async function getUserFromFirebaseByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const user = result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    }
  })
  console.log('user in firebase', user)
  return user
}
