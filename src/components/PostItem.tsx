import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, addCommentToPost } from "../api/postApi";
import { Post } from "../types/types";
import moment from "moment";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState(""); 
  const [error, setError] = useState("");

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        const data = await fetchPostById(id);
        setPost(data);
      }
    };
    getPost();
  }, [id]);


  //add comment to post
  const handleAddComment = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!commentText.trim()) {
      setError("Comment cannot be empty!");
      return;
    }

    try {

      const newComment = await addCommentToPost(id!, commentText);
      setPost((prev) => prev ? { ...prev, comments: [...prev.comments, newComment] } : prev);
      // make input empty after send comment
      setCommentText(""); 
      setError("");
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      {post ? (
        <div className="card shadow-lg p-4">
          <h2 >{post.title}</h2>
          <p className="text-muted">By <strong>{post.author.name}</strong>{" "}
            <small className="text-secondary">
              {moment(post.createdAt).format("DD MMMM YYYY, h:mm A")}
            </small>
          </p>

          <p className="lead text-start m-5">{post.content}</p>


          {/* Comments Section */}
          <div className="mt-4">
            <h4 className="border-bottom p-3 m-2 "> 💬Comments</h4>
            {post.comments.length > 0 ? (
              <ul className="list-group ">
                {post.comments.map((comment: any) => (
                  <li key={comment._id} className="list-group-item text-start">
                    <strong>{comment.user?.name}:</strong> {comment.text}
                    <br />
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          {/* add comment */}
          <div className="mt-4">
            <form onSubmit={handleAddComment}>
              <div className="mb-3 d-flex align-items-center w-75">
                <input
                  className="form-control me-2"
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-secondary">Submit</button>
              </div>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>

        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
