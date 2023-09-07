import React, { useState } from "react"

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  const [displayMode, setDisplayMode] = useState("short")

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
        <h3>{blog.title} <button className="show-hide-button" onClick={handleClick}>{displayMode === "short" ? "Show " : "Hide"}</button></h3>
        {displayMode === "long" &&
        <>
          <p>{blog.url}</p>
          <p>{blog.likes} likes<button className="like-button" onClick={() => addLike(blog.id)}>Like</button></p>
          <small>{blog.author}</small>
          {allowedToRemove && <p><button className="delete-blog-button" onClick={handleRemove}>Remove</button></p>}
        </>
        }
      </div>
    </div>
  )
}

export default Blog
