import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import styles from './comment.module.css'
const Comment = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments)
  return (
    <>
      <div className={styles.container}>
        {comments.length >= 3 && (
          <p className={styles.view}>View All {comments.length} comments</p>
        )}
        {comments.slice(0, 3).map((item) => {
          return (
            <p key={`${item.displayName}-${item.comment}`}>
              <Link to={`/p/${item.displayName}`}>
                <span className={styles.displayName}>{item.displayName}</span>
              </Link>
              <span className={styles.comment}>{item.comment}</span>
            </p>
          )
        })}
        <p className={styles.date}>
          {formatDistance(posted, new Date(), { addSuffix: true })}
        </p>
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
