import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addLike, deleteBlog } from "reducers/blogReducer"
import { setNotification } from "reducers/notificationReducer"
import CommentsList from "./CommentsList"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card } from "react-bootstrap"

const BlogDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blog.find((b) => b.id === id))

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!blog) {
    return <h1>Loading...</h1>
  }

  const removeBlog = (id) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(setNotification({ message: "Blog deleted!", type: "success" }))
      navigate("/blogs")
    } catch (exception) {
      dispatch(setNotification({ message: exception.message, type: "error" }))
    }
  }

  const handleLike = (e) => {
    e.preventDefault()
    try {
      console.log(blog)
      dispatch(addLike(blog))
      dispatch(
        setNotification({ message: `${blog.title} liked!`, type: "success" })
      )
    } catch (exception) {
      setNotification({ message: exception.message, type: "error" })
    }
  }

  // Get username from blog
  const { username } = blog.user

  const allowedToRemove = username === user.username

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  console.log(blog.comments)
  return (
    user && (
      <Card style={{ border: "none" }}>
        <Card.Body className="blog">
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>{blog.likes} likes</Card.Text>
          <Card.Text>
            <Button
              variant="primary"
              size="sm"
              className="like-button"
              onClick={handleLike}
            >
              Like
            </Button>
          </Card.Text>
          <Card.Link style={{ cursor: "pointer" }}>{blog.url}</Card.Link>
          <Card.Text>by {blog.author}</Card.Text>
          {allowedToRemove && (
            <p>
              <button className="delete-blog-button" onClick={handleRemove}>
                Remove
              </button>
            </p>
          )}
          <CommentsList comments={blog.comments} blogId={blog.id} />
        </Card.Body>
      </Card>
    )
  )
}

export default BlogDetails
