import { useSelector } from "react-redux"
import BlogList from "./BlogList"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const BlogListContainer = () => {
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const blogs = useSelector((state) => state.blog)

  return (
    user && <BlogList blogs={blogs.slice().sort((a, b) => b.likes - a.likes)} />
  )
}

export default BlogListContainer
