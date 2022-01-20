import React from 'react'
import PropTypes from 'prop-types'
const Footer = ({ username, caption }) => {
  return (
    <>
      <span>{username}</span>
      <span>{caption}</span>
    </>
  )
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default Footer
