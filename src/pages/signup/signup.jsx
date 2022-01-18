import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import { Link, useHistory } from 'react-router-dom'
import styles from './signup.module.css'
import * as ROUTES from '../../constants/routes'
import { doesUserNameExist } from '../../services/firebase'
function SignUp() {
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid =
    password === '' || emailAddress === '' || userName === '' || fullName === ''
  const history = useHistory()

  const { firebase } = useContext(FirebaseContext)

  const handleSignup = async (e) => {
    e.preventDefault()
    const userNameExists = await doesUserNameExist(userName)
    if (!userNameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password)

        await createdUserResult.user.updateProfile({
          displayName: userName,
        })

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName: fullName.toLowerCase(),
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dataCreated: Date.now(),
        })

        history.push(ROUTES.DASHBOARD)
      } catch (error) {
        setUserName('')
        setEmailAddress('')
        setPassword('')
        setFullName('')
        setError(error.message)
      }
    } else {
      setError('That username is already taken, please try another')
    }
  }

  useEffect(() => {
    document.title = 'Sign up - Sam SNS'
  }, [])
  return (
    <div>
      <div>
        <h1>Sam's SNS</h1>
        <h2>Sign In to see photos and videos from your friends.</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSignup} method="post">
          <input
            type="text"
            aria-label="Enter your email address"
            placeholder="Email address"
            className={styles.inputEmail}
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            type="text"
            aria-label="Enter your Full name"
            placeholder="Full name"
            className={styles.inputFullName}
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            type="text"
            aria-label="Enter your User name"
            placeholder="User name"
            className={styles.inputUserName}
            onChange={({ target }) => setUserName(target.value)}
            value={userName}
          />
          <input
            type="password"
            aria-label="Enter your Password"
            placeholder="Password"
            className={styles.inputPassword}
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`${styles.btnSubmit} ${isInvalid && styles.opacity}`}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <span>Have an account?</span>
        <Link to="/login">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
