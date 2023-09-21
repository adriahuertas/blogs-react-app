import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    username: "",
    name: "",
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: () => {
      window.localStorage.removeItem("loggedBlogAppUser")
      return null
    },
    initializeUser: () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return user
      }
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    dispatch(setUser(user))
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
  }
}

export const { setUser, clearUser, initializeUser } = userSlice.actions
export default userSlice.reducer
