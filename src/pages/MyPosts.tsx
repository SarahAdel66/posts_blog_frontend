import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { Post } from "../types/types";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyPosts = () => {

  const authContext = useContext(AuthContext); 
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();


  useEffect(() => {

    if (authContext?.user) {
      axios
        .get(`https://postsblogbackend-production.up.railway.app/api/posts/user/${authContext?.user._id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [authContext?.user]);

  const handleDelete = async (post: any) => {
    if (!window.confirm("Delete Post ?")) return;

    try {
      
      const token = localStorage.getItem("token"); 
      const response = await fetch(`https://postsblogbackend-production.up.railway.app/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        
        alert("Deleted Succeffully");
        window.location.reload();

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome, {authContext?.user?.name} </h2>
      {posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content.substring(0, 100)}...</p>
                  <Link to={`/post/${post._id}`} className="btn btn-outline-secondary">
                    Read More
                  </Link>

                  <FaEdit className="text-primary m-3" style={{ cursor: "pointer" }} onClick={() => navigate(`/edit-post/${post._id}`)} />
                  <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(post)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
        <h5 className="text-center m-5">No posts yet!</h5>
        <Link to={'/create-post'} className="btn btn-outline-secondary">Creat Post</Link>
        </>
      )}
    </div>
  );
};

export default MyPosts;
