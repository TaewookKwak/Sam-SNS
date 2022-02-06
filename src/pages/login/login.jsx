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
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.login}>
          <h1 className={styles.h1}>Sam's SNS</h1>
          <h2 className={styles.h2}>
            Sign up to see photos and videos from your friends.
          </h2>
          {/* <button className={styles.btnLogInWithGoogle}>
            Log in with Google
          </button> */}
          <div className={styles.lineUnit}>
            <hr className={styles.line} />
            <span className={styles.h2}>OR</span>
            <hr className={styles.line} />
          </div>
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
              className={`${styles.btnLogIn} ${isInvalid && styles.opacity}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className={styles.signup}>
          <span className={styles.firstPara}>Don't have an account? </span>
          <Link to="/signup">
            <span className={styles.btnSignUp}>Sign Up</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Login
