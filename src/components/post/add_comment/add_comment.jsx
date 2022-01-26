import React, { useContext, useState } from 'react'
import Proptypes from 'prop-types'
import FirebaseContext from '../../../context/firebase'
import UserContext from '../../../context/user'
import styles from './add_comment.module.css'
const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const {
    user: { displayName },
  } = useContext(UserContext)

  const handleSumbitComment = (e) => {
    e.preventDefault()
    setComments([{ displayName, comment }, ...comments])
    setComment('') //llear the input field
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ comment, displayName }),
      })
  }
  return (
    <>
      <form
        className={styles.form}
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSumbitComment(e) : e.preventDefault()
        }
      >
        <input
          className={styles.inputComment}
          ref={commentInput}
          type="text"
          name="add-comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className={styles.btnPost}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSumbitComment}
        >
          Post
        </button>
      </form>
    </>
  )
}

AddComment.propTypes = {
  docId: Proptypes.string.isRequired,
  comments: Proptypes.array.isRequired,
  setComments: Proptypes.func.isRequired,
  commentInput: Proptypes.object,
}

export default AddComment
