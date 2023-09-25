import userService from "../services/users"
import UserList from "./UserList"
import { useQuery } from "react-query"

const UserListContainer = () => {
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

  return <UserList users={users} />
}

export default UserListContainer
