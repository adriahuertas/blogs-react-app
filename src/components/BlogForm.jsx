import React, { useState } from "react";

const blogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form onSubmit={() => addBlog(title, author, url)}>
      <div>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor()}
          name="author"
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name="title"
        />
      </div>{" "}
      <button type="submit">save</button>
    </form>
  );
};

export default blogForm;
