import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

import React from 'react'

const Photos = ({ photos }) => {
  return !photos ? (
    <Skeleton count={12} width={100} height={200} />
  ) : (
    <ul>
      {photos.map((item) => {
        return (
          <li key={`${item.docId}-${item.userId}`}>
            <img width={100} src={item.imageSrc} alt="" />
          </li>
        )
      })}
      {!photos || (photos.length === 0 && <p>No Posts Yet</p>)}
    </ul>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
}

export default Photos
