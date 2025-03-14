import { useEffect, useState } from "react";
import { fetchPosts } from "../api/postApi";
import { Post } from "../types/types";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="container m-4">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post._id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate">{post.content}</p>
                <hr />
                <p className=" fw-bold">

                  {post.comments.length > 0
                    ? `💬 ${post.comments.length} ${post.comments.length === 1 ? "Comment" : "Comments"}`
                    : "💬 No Comments"}
                </p>
                <Link to={`/post/${post._id}`} className="btn btn-outline-secondary">
                  Read More
                </Link>
              </div>
              <div className="card-footer text-muted">
                By {post.author.name} - {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
