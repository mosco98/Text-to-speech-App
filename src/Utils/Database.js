import 'firebase/auth'
import 'firebase/firestore'

import * as firebase from 'firebase/app'

const app = {
  apiKey: 'AIzaSyDiap8hO0db_Q9cXEk17C2F32VdvEYFLoo',
  authDomain: 'text-to-speech-4b674.firebaseapp.com',
  databaseURL: 'https://text-to-speech-4b674.firebaseio.com',
  projectId: 'text-to-speech-4b674',
  storageBucket: 'text-to-speech-4b674.appspot.com',
  messagingSenderId: '461599016488',
  appId: '1:461599016488:web:0f359516789d24500e171d',
  measurementId: 'G-BL3CKF4MQ3'
}
// Initialize Firebase
const userAuth = firebase.initializeApp(app)

const db = firebase.firestore()
export { db, userAuth }
