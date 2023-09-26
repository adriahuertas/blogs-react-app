import React from "react"
import { Badge, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,

    borderRadius: "5px",
    marginBottom: "20px",
  }

  return (
    <Card style={blogStyle}>
      <div className="blog">
        <h3>
          <Link
            style={{ textDecoration: "none", marginRight: " 25px" }}
            to={`/blogs/${blog.id}`}
          >
            {blog.title}{" "}
          </Link>
          <Badge style={{ fontSize: "10px", marginRight: "25px" }}>
            {" "}
            by {blog.author}
          </Badge>
          <Badge style={{ fontSize: "10px" }}>{blog.likes} likes</Badge>
        </h3>
      </div>
    </Card>
  )
}

export default Blog
