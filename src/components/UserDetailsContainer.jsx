import UserDetails from "./UserDetails"

import userService from "../services/users"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const UserDetailsContainer = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const result = useQuery("userDetails", () => userService.getById(id), {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

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
