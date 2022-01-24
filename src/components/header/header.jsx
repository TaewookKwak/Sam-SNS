import React, { useContext } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import styles from './header.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Header = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)
  const history = useHistory()
  console.log('user in header', user)
  return (
    <header className={styles.container}>
      <Link to={ROUTES.DASHBOARD}>
        <h1 className={styles.title}>SAM's SNS</h1>
      </Link>
      {user ? (
        <div className={styles.userBar}>
          <Link to={ROUTES.DASHBOARD}>
            <button className={styles.btnHome} type="button">
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <button
            className={styles.btnLogout}
            type="button"
            onClick={() => {
              firebase.auth().signOut()
              history.push(ROUTES.LOGIN)
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>

          <Link to={`/p/${user.displayName}`}>
            <img
              className={styles.avatar}
              src={`/images/avatars/${user.displayName}.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = '/images/avatars/default.png'
              }}
              alt={`${user.displayName} profile picture`}
            />
          </Link>
        </div>
      ) : (
        <>
          <Link to={ROUTES.LOGIN}>
            <button type="button">Log In</button>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <button type="button">Sign Up</button>
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
