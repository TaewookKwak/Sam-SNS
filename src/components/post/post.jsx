import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './header/header'
import Image from './image/image'
import Action from './action/action'
import Footer from './footer/footer'
import Comment from './comment/comment'
const Post = ({ content }) => {
  const commentInput = useRef(null)
  const handleFocus = () => {
    commentInput.current.focus()
  }

  return (
    <>
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Action
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comment
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </>
  )
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
  }),
}

export default Post
