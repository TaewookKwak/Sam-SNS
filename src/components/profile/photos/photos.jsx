import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

import React from 'react'

const Photos = ({ photos }) => {
  return (
    <div>
      <img width={100} src={`${photos}`} alt="" />
    </div>
  )
}

Photos.propTypes = {
  photos: PropTypes.string.isRequired,
}

export default Photos
