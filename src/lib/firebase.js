import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAuth, updateProfile } from 'firebase/auth'
import 'firebase/compat/firestore'

// import { seedDatabase } from '../seed'

const config = {
  apiKey: 'AIzaSyDo6jlMCvBwIJS95qzSXYIb8WOT8BztKLQ',
  authDomain: 'sam-sns.firebaseapp.com',
  projectId: 'sam-sns',
  storageBucket: 'sam-sns.appspot.com',
  messagingSenderId: '293494173326',
  appId: '1:293494173326:web:3ed409d1449d8b95ab63df',
}
const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

// seedDatabase(firebase)
console.log(firebase, FieldValue)

export { firebase, FieldValue, updateProfile, getAuth }
