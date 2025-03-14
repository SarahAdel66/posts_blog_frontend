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
            
            alert("Updated Failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "560px", height: "350px" }}>
                <h3 className="text-center mb-3">Update Post</h3>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input type="text" className="form-control" value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            value={post.content}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-outline-secondary">Save        </button>
                </form>
            </div>

        </div>
    );
};

export default EditPost;
