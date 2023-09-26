import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const UserList = ({ users }) => (
  <>
    <h2>Users</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export default UserList
