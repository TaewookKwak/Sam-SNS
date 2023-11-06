import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// import { seedDatabase } from '../seed'

const config = {
  apiKey: '',
  authDomain: 'sam-sns.firebaseapp.com',
  projectId: 'sam-sns',
  storageBucket: 'sam-sns.appspot.com',
  messagingSenderId: '',
  appId: '',
}
const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

// seedDatabase(firebase)

export { firebase, FieldValue }
