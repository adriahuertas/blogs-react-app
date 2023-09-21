import { useEffect, useState } from "react"
import UserDetails from "./UserDetails"

import userService from "../services/users"
import { useParams } from "react-router-dom"

const UserDetailsContainer = () => {
  const [userDetails, setUserDetails] = useState(null)

  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    userService.getUserById(id).then((user) => {
      setUserDetails(user)
    })
  }, [])

  return userDetails && <UserDetails user={userDetails} />
}

export default UserDetailsContainer
