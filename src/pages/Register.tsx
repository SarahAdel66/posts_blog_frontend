import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert("Email already exists");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-12 col-md-6 mx-auto">
          <div className="card p-4 shadow-lg">
            <h3 className="text-center mb-3">Register</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-secondary ">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// --------------------