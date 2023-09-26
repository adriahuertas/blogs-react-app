import React, { useState, useEffect } from "react"
import blogService from "services/blogs"
import LoginForm from "components/LoginForm"
import BlogForm from "components/BlogForm"
import Notification from "components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "reducers/blogReducer"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"

import { clearUser, initializeUser, loginUser } from "./reducers/userReducer"
import UserListContainer from "./components/UserListContainer"
import UserDetailsContainer from "./components/UserDetailsContainer"
import BlogListContainer from "components/BlogListContainer"
import NavBar from "./components/NavBar"
import BlogDetails from "./components/BlogDetails"

import Container from "react-bootstrap/Container"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await dispatch(loginUser(username, password))
    setUsername("")
    setPassword("")
    if (success) {
      dispatch(
        setNotification({ message: "Login successful", type: "success" })
      )
      navigate("/blogs")
    } else {
      dispatch(setNotification({ message: "Wrong credentials", type: "error" }))
    }
  }

  useEffect(() => {
    dispatch(initializeUser())

    blogService
      .getAll()
      .then((blogs) =>
        dispatch(initializeBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      )
      .catch((err) => console.log(err))
  }, [])

  return (
    <Container>
      {" "}
      <div>
        <NavBar />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <BlogListContainer />
              ) : (
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleSubmit={handleLogin}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user && (
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleSubmit={handleLogin}
                />
              )
            }
          />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/users" element={<UserListContainer />} />
          <Route path="/blogs" element={<BlogListContainer />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users/:id" element={<UserDetailsContainer />} />
        </Routes>{" "}
      </div>{" "}
    </Container>
  )
}

export default App
