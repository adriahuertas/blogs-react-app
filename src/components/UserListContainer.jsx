import { useNavigate } from "react-router-dom"
import userService from "../services/users"
import UserList from "./UserList"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const UserListContainer = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])
  const result = useQuery("usersList", userService.getAll, {
    refetchOnWindowFocus: false,
  })

  // useEffect(() => {
  //   userService.getAll().then((initialUsers) => {
  //     console.log(initialUsers)
  //     setUsers(initialUsers)
  //   })
  // }, [])
  if (result.isLoading) {
    return <h1>Loading...</h1>
  }

  if (result.isError) {
    return <h1>Something went wrong</h1>
  }

  const users = result.data

  return user && <UserList users={users} />
}

export default UserListContainer
