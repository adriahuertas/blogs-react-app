import { useEffect } from "react"
import CommentForm from "./CommentForm"

const CommentsList = ({ comments, blogId }) => {
  useEffect(() => {}, [comments])
  return (
    <>
      <h3>Comments</h3>
      <CommentForm blogId={blogId} />
      {comments
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <small>{new Date(comment.date).toLocaleString()}</small>{" "}
          </div>
        ))}
    </>
  )
}

export default CommentsList
