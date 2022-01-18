import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import { Link, useHistory } from 'react-router-dom'
import styles from './signup.module.css'
import * as ROUTES from '../../constants/routes'
function SignUp() {
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === ''
  const history = useHistory()

  const { firebase } = useContext(FirebaseContext)

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().signUpWithEmailAndPassword(emailAddress, password)
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress('')
      setPassword('')
      setError(error.message)
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
          />
          <input
            type="text"
            aria-label="Enter your Full name"
            placeholder="Full name"
            className={styles.inputFullName}
            onChange={({ target }) => setFullName(target.value)}
          />
          <input
            type="text"
            aria-label="Enter your User name"
            placeholder="User name"
            className={styles.inputUserName}
            onChange={({ target }) => setUserName(target.value)}
          />
          <input
            type="password"
            aria-label="Enter your Password"
            placeholder="Password"
            className={styles.inputPassword}
            onChange={({ target }) => setPassword(target.value)}
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
