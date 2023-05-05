import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handelLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/testimonials"}>
            Alpha Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/testimonials"} className="nav-link">
                Testimonials
              </Link>
              <Link to={"/logos"} className="nav-link">
                Logos
              </Link>
              <Link to={"/projects"} className="nav-link active">
                Projects
              </Link>
              <Link to={"/contactUs"} className="nav-link active">
                contact us
              </Link>
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
              <Link to={"/aboutUs"} className="nav-link">
                About us
              </Link>
              <Link className="nav-link " onClick={handelLogout}>
                Log out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
