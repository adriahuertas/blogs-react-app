import Blog from "./Blog"

const BlogList = ({ blogs }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog, index) => (
        <div data-cy={blog.title} key={blog.id}>
          <Blog key={blog.id} blog={blog} />
        </div>
      ))}
    </>
  )
}

export default BlogList
