import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await response.json();
        setPost({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      alert("Updated Successfully");
      navigate("/my-posts");
    } else {
      alert("Update Failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-12 col-md-6 mx-auto">
          <div className="card p-4 shadow-lg">
            <h3 className="text-center mb-3">Update Post</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold d-block text-start">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold d-block text-start">Content</label>
                <textarea
                  className="form-control"
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  required
                  rows={4}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-outline-secondary ">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
