import React from 'react'
import PropTypes from 'prop-types'
import styles from './image.module.css'
import * as ROUTES from '../../../constants/routes'
import { useHistory } from 'react-router-dom'
const Image = ({ src, caption, photoId }) => {
  const history = useHistory()
  const onStory = (e) => {
    history.push({
      pathname: ROUTES.STORY,
      state: { photoid: e.target.dataset.photoid },
    })
  }
  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={caption}
        className={styles.image}
        onClick={onStory}
        data-photoid={photoId}
      />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

export default Image
