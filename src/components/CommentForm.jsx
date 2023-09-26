import { useState } from "react"
import { addComment } from "reducers/blogReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "reducers/notificationReducer"

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = dispatch(addComment(blogId, comment))
    setComment("")
    if (result) {
      dispatch(setNotification({ message: "Comment added", type: "success" }))
    } else {
      dispatch(
        setNotification({ message: "Error adding comment", type: "error" })
      )
    }
  }

  const isSubmitDisabled = comment.trim() === ""

  return (
    <form style={{ marginTop: 10, marginBottom: 10 }} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add comment..."
        onChange={(e) => setComment(e.target.value)}
      />
      <button disabled={isSubmitDisabled}>Add comment</button>
    </form>
  )
}

export default CommentForm
