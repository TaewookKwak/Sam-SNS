import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './comment.module.css'
import AddComment from '../add_comment/add_comment'
import FirebaseContext from '../../../context/firebase'

const Comment = ({
  docId,
  comments: allComments,
  commentInput,
  username,
  setUpdate,
}) => {
  const [comments, setComments] = useState(allComments)
  const [showingView, setShowingView] = useState(false)
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const onDelete = (e) => {
    setComments((prev) =>
      prev.filter((item) => {
        return (
          item.comment !== e.target.dataset.comment ||
          item.displayName !== e.target.dataset.username
        )
      }),
    )
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayRemove({
          comment: e.target.dataset.comment,
          displayName: e.target.dataset.username,
        }),
      })
  }
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
                  {username === item.displayName ? (
                    <span
                      className={styles.btnDelete}
                      onClick={onDelete}
                      data-username={username}
                      data-comment={item.comment}
                    >
                      x
                    </span>
                  ) : null}
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
                  <span className={styles.btnDelete} onClick={onDelete}>
                    x
                  </span>
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
