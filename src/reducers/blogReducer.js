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
    likeBlog: (state, action) => {
      const blog = state.find((blog) => blog.id === action.payload)
      blog.likes++
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
    const newBlog = await blogService.create(blog)
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (id, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch(likeBlog(updatedBlog.id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)

    dispatch(removeBlog(id))
  }
}
export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
