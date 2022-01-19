import React, { useContext } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import styles from './header.module.css'
const Header = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)

  console.log('user in header', user)
  return (
    <header>
      <Link to={ROUTES.DASHBOARD}>
        <h1>HEADER</h1>
      </Link>
      {user ? (
        <>
          <Link to={ROUTES.DASHBOARD}>
            <button type="button">
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <button type="button" onClick={() => firebase.auth().signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <div>
            <Link to={`/p/${user.displayName}`}>
              <img
                className={styles.avatar}
                src={`/images/avatars/${user.displayName}.jpg`}
                alt={`${user.displayName} profile picture`}
              />
            </Link>
          </div>
        </>
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
