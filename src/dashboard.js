import { useSelector } from "react-redux";
import LoggedOut from "./loggedOut";
import LoggedIn from "./LoggedIn";

export default function Dashboard() {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { loginStatus } = loginReducer;

  return (
    <div className="dashboard">
      {loginStatus ? <LoggedIn /> : <LoggedOut />}
    </div>
  );
}
