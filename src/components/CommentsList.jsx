import { useEffect } from "react"
import CommentForm from "./CommentForm"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

const CommentsList = ({ comments, blogId }) => {
  useEffect(() => {}, [comments])
  return (
    <>
      <small style={{ paddingBottom: "20px" }}>Comments</small>
      <CommentForm blogId={blogId} />
      <ListGroup>
        {comments
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((comment) => (
            <ListGroupItem
              key={comment._id}
              style={{ marginBottom: 20, borderRadius: 5 }}
            >
              {comment.text}
              <small style={{ marginLeft: 7, fontSize: 13 }}>
                - {new Date(comment.date).toLocaleString()}
              </small>
            </ListGroupItem>
          ))}
      </ListGroup>
    </>
  )
}

export default CommentsList
