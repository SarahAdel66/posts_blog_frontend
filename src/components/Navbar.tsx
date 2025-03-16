import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top m-3 rounded shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold text-dark" to="/">
            Posts Blog
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* الروابط */}
          <div className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/" onClick={handleNavCollapse}>
                  Home
                </Link>
              </li>
              {authContext?.user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/create-post" onClick={handleNavCollapse}>
                      Create Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/my-posts" onClick={handleNavCollapse}>
                      My Posts
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* الزرار واليوزر في الآخر */}
            <ul className="navbar-nav">
              {authContext?.user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-dark">Welcome, {authContext.user.name}</span>
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
                    <Link className="nav-link text-dark" to="/login" onClick={handleNavCollapse}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/register" onClick={handleNavCollapse}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </>
  );
};

export default Navbar;


// ------------------------