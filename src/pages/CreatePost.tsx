import { useContext } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../api/postApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {

    try {
      const token = authContext?.token || localStorage.getItem("token");

      if (!token) {
        throw new Error("No token available"); 
      }
      
      //send token with post info
      await createPost({ title: data.title, content: data.content }, token); 
      alert("Post Created Successfully")
      navigate("/");
      
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };
  return (
  
    <div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "560px" ,height:"350px" }}>
        <h3 className="text-center mb-3">Create a New Post</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input {...register("title")} placeholder="Title" className="form-control" required />
          </div>

          <div className="mb-3">
            <textarea {...register("content")} placeholder="Content" className="form-control" required />
          </div>
        
          <button type="submit" className="btn btn-outline-secondary ">Create Post</button>

        </form>

      </div>
    </div>
    
  </div>
  );
};

export default CreatePost;
