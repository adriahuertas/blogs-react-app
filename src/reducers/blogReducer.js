import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const newBlogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
      return newBlogs
    },
    removeBlog: (state, action) => {
      console.log(action.payload)
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      console.log(newBlog)
      dispatch(appendBlog(newBlog))
      if (newBlog) return true
    } catch (error) {
      return false
    }

    return false
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogId, comment)
    dispatch(updateBlog(updatedBlog))
    return true
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)

    dispatch(removeBlog(id))
  }
}
export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
