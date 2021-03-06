import "./index.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { logout, useAuth } from "./firebase";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "./redux/actions";

export default function NavBar() {
  const dispatch = useDispatch();

  const isLoggedIn = (isLoggedin) => {
    dispatch(updateLoginStatus(isLoggedin));
  };

  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      isLoggedIn(false);
    } catch {
      alert("Logout Failed");
    }
    setLoading(false);
  }

  return (
    <div className="navBar">
      {" "}
      <div>
        <span>
          <NavLink           
          className="nav-link"
          to="/">
            {" "}
            Dashboard
          </NavLink>
        </span>
        <span>
          <NavLink
          className="nav-link"
            to="/"
            disabled={loading || !currentUser}
            onClick={handleLogout}
          >
            Log Out{" "}
          </NavLink>
        </span>
      </div>
    </div>
  );
}
