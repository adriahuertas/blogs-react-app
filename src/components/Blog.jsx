import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addLike, deleteBlog } from "reducers/blogReducer"
import { setNotification } from "reducers/notificationReducer"

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const [displayMode, setDisplayMode] = useState("short")
  const dispatch = useDispatch()

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
      dispatch(addLike(blog.id, { ...blog, likes: blog.likes + 1 }))
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

  const handleClick = () => {
    if (displayMode === "short") {
      setDisplayMode("long")
    } else {
      setDisplayMode("short")
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        <h3>
          {blog.title}{" "}
          <button className="show-hide-button" onClick={handleClick}>
            {displayMode === "short" ? "Show " : "Hide"}
          </button>
        </h3>
        {displayMode === "long" && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Blog
