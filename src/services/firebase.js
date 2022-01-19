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
