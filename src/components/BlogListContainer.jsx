import { useSelector } from "react-redux"
import BlogList from "./BlogList"

const BlogListContainer = () => {
  const blogs = useSelector((state) => state.blog)

  return <BlogList blogs={blogs} />
}

export default BlogListContainer
