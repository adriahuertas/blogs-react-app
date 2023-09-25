import Blog from "./Blog"

const BlogList = ({ blogs }) => {
  return blogs.map((blog, index) => (
    <div data-cy={blog.title} key={blog.id}>
      <Blog key={blog.id} blog={blog} />
    </div>
  ))
}

export default BlogList
