import { useState, useEffect } from "react"
import userService from "../services/users"
import UserList from "./UserList"

const UserListContainer = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      console.log(initialUsers)
      setUsers(initialUsers)
    })
  }, [])

  return <UserList users={users} />
}

export default UserListContainer
