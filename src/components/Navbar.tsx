import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // to use it in responsive navbar to open and close it
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top m-3 rounded">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Posts Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse d-flex justify-content-around ${isNavCollapsed ? "" : "show"}`} id="navbarNav">
          <div className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavCollapse}>
                Home
              </Link>
            </li>
            {authContext?.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-post" onClick={handleNavCollapse}>
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-posts" onClick={handleNavCollapse}>
                    My Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {authContext?.user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={authContext.logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleNavCollapse}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={handleNavCollapse}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    <br/>
    </>
  
  );
};

export default Navbar;
