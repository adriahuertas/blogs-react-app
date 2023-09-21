import React, { useState, useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import blogService from "../services/blogs"

import NotificationContext from "context/NotificationContext"

const blogForm = () => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useContext(NotificationContext)

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs")
      queryClient.setQueryData("blogs", blogs.concat(newBlog))
      setNotification({ message: `${newBlog.title} added!`, type: "success" })
    },
  })

  const addBlog = async (title, author, url) => {
    const blogObject = {
      title,
      author,
      url,
      date: new Date().toISOString(),
    }
    newBlogMutation.mutate(blogObject)
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
