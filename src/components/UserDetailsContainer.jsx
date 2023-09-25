import UserDetails from "./UserDetails"

import userService from "../services/users"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useEffect } from "react"

const UserDetailsContainer = () => {
  const { id } = useParams()
  console.log(id)

  const result = useQuery("userDetails", () => userService.getById(id), {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    result.refetch()
  }, [id])

  if (result.isLoading) {
    return <h1>Loading...</h1>
  }

  if (result.isError) {
    return <h1>Something went wrong</h1>
  }

  const userDetails = result.data

  return <UserDetails user={userDetails} />
}

export default UserDetailsContainer
