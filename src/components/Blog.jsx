import React, { useState, useContext } from "react"
import blogService from "../services/blogs"
import { useMutation, useQueryClient } from "react-query"

import NotificationContext from "context/NotificationContext"

const Blog = ({ blog, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const [displayMode, setDisplayMode] = useState("short")

  const queryClient = useQueryClient()

  const [notification, setNotification] = useContext(NotificationContext)

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries("blogs")
      // console.log("UpdatedBlog:", updatedBlog)
      // const blogs = queryClient.getQueryData("blogs")
      // const newBlogs = blogs.map((blog) =>
      //   blog.id === updatedBlog.id ? updatedBlog : blog
      // )
      // queryClient.setQueryData("blogs", newBlogs)
      // setNotification({
      //   message: `${updatedBlog.title} liked!`,
      //   type: "success",
      // })
    },
  })

  const addLike = async (id) => {
    const blogs = queryClient.getQueryData("blogs")
    const blog = blogs.find((blog) => blog.id === id)
    console.log(blog)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      date: blog.date,
      likes: blog.likes + 1,
    }
    console.log("BLOGOBJECT", blogObject)
    updateBlogMutation.mutate(id, blogObject)
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
              <button className="like-button" onClick={() => addLike(blog.id)}>
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
