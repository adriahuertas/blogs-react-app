import { Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const UserDetails = ({ user }) => {
  return (
    <Container>
      <h5>Blogs from user {user.username}</h5>
      <ul>
        {user.blogs.map((blog) => {
          console.log(blog)
          return (
            <Col key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </Col>
          )
        })}
      </ul>
    </Container>
  )
}

export default UserDetails
