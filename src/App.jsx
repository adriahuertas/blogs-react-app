import React, { useState, useEffect, useRef } from "react"
import Blog from "components/Blog"
import blogService from "services/blogs"
import loginService from "services/login"
import LoginForm from "components/LoginForm"
import BlogForm from "components/BlogForm"
import Notification from "components/Notification"
import Togglable from "components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "reducers/blogReducer"
import { setBlogs } from "./reducers/blogReducer"

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(
        setNotification({ message: "Login successful", type: "success" })
      )

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
    } catch (exception) {
      dispatch(setNotification({ message: "Wrong credentials", type: "error" }))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const addBlog = async (title, author, url) => {
    const blogObject = {
      title,
      author,
      url,
      date: new Date().toISOString(),
    }
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      dispatch(
        setNotification({
          message: `a new blog ${blog.title} by ${blog.author} added`,
          type: "success",
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({ message: "Something went wrong", type: "error" })
      )
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const newBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(newBlogs)
    } catch (exception) {
      dispatch(
        setNotification({ message: "Something went wrong", type: "error" })
      )
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      const updatedBlog = await blogService.update(id, blogObject)
      const newBlogs = blogs
        .map((blog) => (blog.id !== id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
      dispatch(
        setNotification({
          message: `Liked ${blog.title}!`,
          type: "success",
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({ message: "Something went wrong", type: "error" })
      )
    }
  }

  useEffect(() => {
    // Check loggin
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(initializeBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      )
      .catch((err) => console.log(err))
  }, [])

  const blogs = useSelector((state) => state.blog)

  return (
    <>
      <div>
        <h2>Blogs</h2>
        <Notification />

        {!user && (
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        )}
        {user && (
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
        )}
        {user && (
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <div>
              <BlogForm addBlog={addBlog} />
            </div>
          </Togglable>
        )}

        {user &&
          blogs.map((blog, index) => (
            <div data-cy={blog.title} key={blog.id}>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                user={user}
                removeBlog={removeBlog}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default App
