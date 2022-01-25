import { useState } from 'react'
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

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  // console.log('isUserExisted', isUserExisted)
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
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

export async function getPhotosFromFirebase(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))

  const photosWithUserDetail = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }
      const user = await getUserFromFirebaseByUserId(photo.userId)
      const { username } = user[0]
      return { username, ...photo, userLikedPhoto }
    }),
  )
  return photosWithUserDetail
}

export async function getAllPhotosByUserIdFromFirebase(userId) {
  try {
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get()

    const photos = result.docs.map((item) => {
      return { ...item.data(), docId: item.id }
    })
    // console.log('result in photos', photos)
    return photos
  } catch (err) {
    console.log(err)
  }
}

export async function updateLoggedInUserFollowingFromFirebase(
  profileId,
  loggedInUserDocId,
  isFollowingProfile,
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
}

export async function updateFollowingProfileFollowedUserFromFirebase(
  profileDocId,
  loggedInUserDocId,
  isFollowedProfile,
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowedProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    })
}

export async function getPhotosByUsername(username) {
  const [user] = await getUserByUsername(username)
  const userId = user.userId
  const photos = await getAllPhotosByUserIdFromFirebase(userId)
  return photos
}

export async function isUserFollowingProfile(username, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const [user] = result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    }
  })
  const isUserFollowingProfileUser = user.following.some(
    (item) => item === profileUserId,
  )
  return isUserFollowingProfileUser
}
