import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
const Comment = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments)
  return (
    <>
      <div>
        {comments.length >= 3 && <p>View All {comments.length} comments</p>}
        {comments.slice(0, 3).map((item) => {
          return (
            <p key={`${item.displayName}-${item.comment}`}>
              <Link to={`/p/${item.displayName}`}>
                <span>{item.displayName}</span>
                <span>{item.comment}</span>
              </Link>
            </p>
          )
        })}
        <p>{formatDistance(posted, new Date(), { addSuffix: true })}</p>
      </div>
    </>
  )
}

Comment.propTypes = {
  docId: PropTypes.string.isRequired,
  allComments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
}

export default Comment
