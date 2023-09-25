import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { clearUser } from "reducers/userReducer"

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <nav>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {user && (
          <li>
            <Link to="/create">Add new blog</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <>
            <li>{user.username} logged in</li>
            <li>
              <button onClick={() => dispatch(clearUser())}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
