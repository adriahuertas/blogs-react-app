import React, { useEffect, useState } from "react"
import { createBlog } from "reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "reducers/notificationReducer"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const blogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const addBlog = async (title, author, url) => {
    const blog = { title, author, url }

    const result = await dispatch(createBlog(blog))
    console.log(result)

    if (result) {
      dispatch(
        setNotification({ message: `${blog.title} created!`, type: "success" })
      )
      navigate("/blogs")
    } else {
      dispatch(
        setNotification({ message: "Error creating blog", type: "error" })
      )
    }
  }

  return (
    <>
      <h2>Create new blog</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          addBlog(title, author, url)
          setTitle("")
          setAuthor("")
          setUrl("")
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control
            placeholder="Url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default blogForm
