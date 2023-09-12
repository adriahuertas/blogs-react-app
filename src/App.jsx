import React, { useState, useEffect, useRef } from "react"
import Blog from "components/Blog"
import blogService from "services/blogs"
import loginService from "services/login"
import LoginForm from "components/LoginForm"
import BlogForm from "components/BlogForm"
import Notification from "components/Notification"
import Togglable from "components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setSuccessMessage("Login successful")

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
    } catch (exception) {
      setErrorMessage("Wrong credentials")
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
      date: new Date().toISOString()
    }
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (exception) {
      setErrorMessage("Something went wrong")
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const newBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(newBlogs)
    } catch (exception) {
      setErrorMessage("Something went wrong")
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const updatedBlog = await blogService.update(id, blogObject)
      const newBlogs = blogs.map(blog => blog.id !== id ? blog : updatedBlog).sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (exception) {
      setErrorMessage("Something went wrong")
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
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div>
        <h2>Blogs</h2>
        <Notification
          message={errorMessage}
          setMessage={setErrorMessage}
          type="error"
        />
        <Notification
          message={successMessage}
          setMessage={setSuccessMessage}
          type="success"
        />
        {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>}
        {user &&
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
        }
        {user &&
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <div>
              <BlogForm addBlog={addBlog}/>
            </div>
          </Togglable>
        }

        {user && blogs.map((blog, index) => (
          <div data-cy={blog.title} key={blog.id}>
            <Blog key={blog.id} blog={blog} addLike={addLike} user={user} removeBlog={removeBlog}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
