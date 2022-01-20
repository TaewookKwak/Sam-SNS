import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
const Header = ({ username }) => {
  return (
    <div>
      <Link to={`/p/${username}`}>
        <img
          width={30}
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile image`}
        />
        <p>{username}</p>
      </Link>
    </div>
  )
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Header
