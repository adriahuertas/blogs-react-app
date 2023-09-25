import React, { useState } from "react"
import { createBlog } from "reducers/blogReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "reducers/notificationReducer"

const blogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (title, author, url) => {
    const blog = { title, author, url }

    const result = dispatch(createBlog(blog))
    if (result) {
      dispatch(
        setNotification({ message: `${blog.title} created!`, type: "success" })
      )
    } else {
      setNotification({ message: "Error creating blog", type: "error" })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addBlog(title, author, url)
        setTitle("")
        setAuthor("")
        setUrl("")
      }}
    >
      <div>
        Title
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
      </div>
      <div>
        Author
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        />
      </div>
      <div>
        Url
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name="title"
        />
      </div>{" "}
      <button id="create-blog-button" type="submit">
        save
      </button>
    </form>
  )
}

export default blogForm
