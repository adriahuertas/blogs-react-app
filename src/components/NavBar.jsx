import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "reducers/userReducer"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap"
import { setNotification } from "reducers/notificationReducer"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // return (
  //   <nav>
  //     <ul>
  //       <li>
  //         <Link to="/blogs">Blogs</Link>
  //       </li>
  //       <li>
  //         <Link to="/users">Users</Link>
  //       </li>
  //       {user && (
  //         <li>
  //           <Link to="/create">Add new blog</Link>
  //         </li>
  //       )}
  //       {!user && (
  //         <li>
  //           <Link to="/login">Login</Link>
  //         </li>
  //       )}
  //       {user && (
  //         <>
  //           <li>{user.username} logged in</li>
  //           <li>
  //             <button onClick={() => dispatch(clearUser())}>Logout</button>
  //           </li>
  //         </>
  //       )}
  //     </ul>
  //   </nav>
  // )
  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(setNotification({ message: "Logout successful", type: "success" }))
    navigate("/login")
  }
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <LinkContainer to="/blogs">
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create">
            <Nav.Link>New Blog</Nav.Link>
          </LinkContainer>{" "}
          {!user && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {user && (
          <Nav>
            <Navbar.Collapse>
              <Navbar.Text style={{ paddingRight: "20px" }}>
                Signed in as: {user.username}
              </Navbar.Text>
              <button
                style={{ borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </Navbar.Collapse>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}

export default NavBar
