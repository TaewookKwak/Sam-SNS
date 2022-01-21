import React from 'react'
import PropTypes from 'prop-types'
import styles from './image.module.css'
const Image = ({ src, caption }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={caption} className={styles.image} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

export default Image
