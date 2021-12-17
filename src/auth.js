import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "./firebase";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "./redux/actions";

export default function Auth() {
  const dispatch = useDispatch();

  const isLoggedIn = (isLoggedin) => {
    dispatch(updateLoginStatus(isLoggedin));
  };

  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      isLoggedIn(true);
    } catch {
      isLoggedIn(false);

      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      isLoggedIn(true);
    } catch {
      isLoggedIn(false);

      alert("Error!");
    }
    setLoading(false);
  }

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
    <div id="auth">
      <div id="fields">
        <h1>You are not logged in. Sign up or login</h1>
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>
      <button disabled={loading || currentUser} onClick={handleSignup}>
        Sign Up
      </button>
      <button disabled={loading || currentUser} onClick={handleLogin}>
        Log In
      </button>
      <button disabled={loading || !currentUser} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
