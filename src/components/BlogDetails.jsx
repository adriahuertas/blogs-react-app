import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addLike, deleteBlog } from "reducers/blogReducer"
import { setNotification } from "reducers/notificationReducer"
import CommentsList from "./CommentsList"
import { useParams } from "react-router-dom"

const BlogDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blog.find((b) => b.id === id))

  if (!blog) {
    return <h1>Loading...</h1>
  }

  const removeBlog = (id) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(setNotification({ message: "Blog deleted!", type: "success" }))
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
    <div>
      <div className="blog">
        <h2>{blog.title} </h2>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes
          <button className="like-button" onClick={handleLike}>
            Like
          </button>
        </p>
        <small>{blog.author}</small>
        {allowedToRemove && (
          <p>
            <button className="delete-blog-button" onClick={handleRemove}>
              Remove
            </button>
          </p>
        )}
        <CommentsList comments={blog.comments} blogId={blog.id} />
      </div>
    </div>
  )
}

export default BlogDetails
