const UserDetails = ({ user }) => {
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          console.log(blog)
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </>
  )
}

export default UserDetails
