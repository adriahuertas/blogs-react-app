import { Link } from "react-router-dom"

const UserList = ({ users }) => (
  <>
    <h2>Users</h2>
    <table>
      <th>
        <td></td>
        <td>Blogs created</td>
      </th>

      {users.map((user) => (
        <>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        </>
      ))}
    </table>
  </>
)

export default UserList
