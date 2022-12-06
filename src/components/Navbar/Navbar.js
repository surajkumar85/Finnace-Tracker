import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();
  return (
    <div className="navbar">
      <div className="navbar__nav">
        <h1 className="navbar__brand">fTracker</h1>
        <div className="navbar__btns">
          {!user && (
            <>
              <Link to="/login" className="navbar__btn">
                Login
              </Link>
              <Link to="/signup" className="navbar__btn">
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <p className="navbar__name">hello, {user.displayName}</p>
              {!isPending && (
                <button className="form__btn" onClick={logout}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="form__btn" disabled>
                  Loging out...
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
