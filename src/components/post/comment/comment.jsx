import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './comment.module.css'
import AddComment from '../add_comment/add_comment'

const Comment = ({ docId, comments: allComments, commentInput }) => {
  const [comments, setComments] = useState(allComments)
  const [showingView, setShowingView] = useState(false)
  return (
    <>
      <div className={styles.container}>
        {comments.length >= 3 && (
          <p
            onClick={() => setShowingView((prev) => !prev)}
            className={styles.view}
          >
            {showingView ? '(Hide comments)' : '(View All comments)'}
          </p>
        )}
        {!showingView
          ? comments.slice(0, 3).map((item) => {
              return (
                <p key={`${item.displayName}-${item.comment}`}>
                  <Link to={`/p/${item.displayName}`}>
                    <span className={styles.displayName}>
                      {item.displayName}
                    </span>
                  </Link>
                  <span className={styles.comment}>{item.comment}</span>
                </p>
              )
            })
          : comments.map((item) => {
              return (
                <p key={`${item.displayName}-${item.comment}`}>
                  <Link to={`/p/${item.displayName}`}>
                    <span className={styles.displayName}>
                      {item.displayName}
                    </span>
                  </Link>
                  <span className={styles.comment}>{item.comment}</span>
                </p>
              )
            })}

        <AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
          commentInput={commentInput}
        />
      </div>
    </>
  )
}

Comment.propTypes = {
  docId: PropTypes.string.isRequired,
  allComments: PropTypes.array,
  commentInput: PropTypes.object.isRequired,
}

export default Comment
