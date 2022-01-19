import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const isUserExisted = result.docs.length > 0
  // console.log('isUserExisted', isUserExisted)
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
  // console.log('user in firebase', user)
  return user
}

export async function getAllUsersFromFirebase(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get()
  const user = result.docs
    .map((item) => ({ ...item.data(), docId: item.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId),
    )
  // console.log('result in getSuggestionFromFirebase', result, user)
  return user
}

export async function getAllPhotosFromFirebase() {
  const result = await firebase.firestore().collection('photos').get()
  const photos = result.docs.map((item) => {
    return { ...item.data() }
  })
  // console.log('result in photos', result, photos)
  return photos
}

export async function updateLoggedInUserFollowingFromFirebase(
  profileId,
  loggedInUserDocId,
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({ following: FieldValue.arrayUnion(profileId) })
}

export async function updateFollowingProfileFollowedUserFromFirebase(
  suggestedProfileDocId,
  userId,
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(suggestedProfileDocId)
    .update({ followers: FieldValue.arrayUnion(userId) })
}
