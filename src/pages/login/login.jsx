import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import { Link, useHistory } from 'react-router-dom'
import styles from './login.module.css'
import * as ROUTES from '../../constants/routes'
function Login() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === ''
  const history = useHistory()

  const { firebase } = useContext(FirebaseContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress('')
      setPassword('')
      setError(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Login - Sam SNS'
  }, [])
  return (
    <div>
      <div>
        <h1>Sam's SNS</h1>
        <h2>Sign up to see photos and videos from your friends.</h2>
        <button>Log in with Google</button>
        <h2>OR</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} method="post">
          <input
            type="text"
            aria-label="Enter your email address"
            placeholder="Email address"
            className={styles.inputEmail}
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            type="password"
            aria-label="Enter your password"
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
            Log In
          </button>
        </form>
      </div>
      <div>
        <span>Don't have an account? </span>
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
