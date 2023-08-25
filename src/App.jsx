import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import blogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newBlog, setNewBlog] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    } catch (exception) {
      setErrorMessage("Wrong credentials");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (title, author, url) => {
    const blogObject = {
      title,
      author,
      url,
      date: new Date().toISOString(),
    };
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
    }
  };

  useEffect(() => {
    // Check loggin
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs).catch((err) => console.log(err)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification
          message={errorMessage}
          setMessage={setErrorMessage}
          type="error"
        />
        <Notification
          message={successMessage}
          setMessage={setSuccessMessage}
          type="success"
        />
        {user === null ? (
          <LoginForm handleLogin={handleLogin} />
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            <blogForm />
          </div>
        )}

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
