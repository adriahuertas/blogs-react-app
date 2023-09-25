import React from "react"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        <h3>
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
        </h3>
      </div>
    </div>
  )
}

export default Blog
