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
import { createBlog, initializeBlogs } from "reducers/blogReducer"

import { clearUser, initializeUser, loginUser } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(loginUser(username, password))
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
  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(setNotification({ message: "Logout successful", type: "success" }))
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
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification({
          message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
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
    // const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   blogService.setToken(user.token)
    // }
    dispatch(initializeUser())

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
              <Blog key={blog.id} blog={blog} user={user} />
            </div>
          ))}
      </div>
    </>
  )
}

export default App
