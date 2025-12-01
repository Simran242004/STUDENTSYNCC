import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LEFT BRAND */}
        <Link to="/" className="brand">
          <div className="brand-logo">SS</div>
          <span className="brand-name">
            <strong>StudentSync</strong>
          </span>
        </Link>

        {/* RIGHT NAV LINKS */}
        <div className="nav-right">

          <Link className="nav-btn" to="/">Home</Link>
          <Link className="nav-btn" to="/sell">Sell</Link>
          <Link className="nav-btn" to="/profile">Profile</Link>

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="nav-b" to="/login">Login</Link>
              <Link className="nav-b" to="/signup">Signup</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
