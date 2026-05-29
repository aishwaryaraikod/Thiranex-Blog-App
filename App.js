import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState({});

  // GET POSTS
  const getPosts = () => {
    axios.get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // ADD POST
  const addPost = () => {

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/posts", {
      title,
      content
    })
    .then(() => {

      getPosts();

      setTitle("");
      setContent("");
    });
  };

  // DELETE POST
  const deletePost = (id) => {

    axios.delete('http://localhost:5000/posts/${id}')
      .then(() => {
        getPosts();
      });
  };

  // ADD COMMENT
  const addComment = (id) => {

    axios.post('http://localhost:5000/posts/${id}/comment', 
      {
      text: commentText[id]
    }).then(() => {

      setCommentText({
        ...commentText,
        [id]: ""
      });

      getPosts();
    });
  };

  return (

    <div style={{
      backgroundColor: "#f4f6f9",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      <div style={{
        maxWidth: "700px",
        margin: "auto",
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{
          textAlign: "center",
          color: "#333"
        }}>
          📝 Professional Blog App
        </h1>

        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <textarea
          placeholder="Enter Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid gray",
            height: "120px"
          }}
        />

        <button
          onClick={addPost}
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Add Blog
        </button>

        <hr style={{ margin: "30px 0" }} />

        {posts.map((post) => (

          <div
            key={post.id}
            style={{
              background: "#fafafa",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "25px",
              border: "1px solid #ddd"
            }}
          >

            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <button
              onClick={() => deletePost(post.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

            <div style={{ marginTop: "20px" }}>

              <h4>Comments</h4>

              {post.comments && post.comments.map((c, index) => (
                <p key={index}>💬 {c}</p>
              ))}

              <input
                type="text"
                placeholder="Write comment..."
                value={commentText[post.id] || ""}
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [post.id]: e.target.value
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "6px",
                  border: "1px solid gray"
                }}
              />

              <button
                onClick={() => addComment(post.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Add Comment
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;