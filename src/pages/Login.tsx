import { useContext } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onSubmit = async (data: any) => {
   

    try {

      //get user and token
      const { user, token } = await loginUser(data); 
      //send user and token to authContext
      authContext?.login(user, token);

      navigate("/my-posts");

    } catch (error) {
      
      alert("invalid email or password")
      console.error("Login failed", error);
    }
  };

  return (

    <div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "560px" ,height:"300px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          <div className="mb-3">
            <input type="email" {...register("email")} placeholder="Email" className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="password" {...register("password")} placeholder="Password" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-outline-secondary ">Login</button>

        </form>

      </div>
    </div>
    
  </div>
  );
};

export default Login;

