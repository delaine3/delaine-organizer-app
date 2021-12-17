import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "./redux/actions";

export default function Watch() {
  const dispatch = useDispatch();

  const isLoggedIn = (isLoggedin) => {
    dispatch(updateLoginStatus(isLoggedin));
  };

  return (
    <div className="post-component">
      {isLoggedIn ? (
        <div>
          <br />
          <br />
          <ul className=" icon-grid">
            <li className="nav-link">
              <NavLink activestyle={{ color: "red" }} to="/showsToWatch">
                {" "}
                <img
                  src="https://img.icons8.com/clouds/2x/tv-show.png"
                  alt="65-656848-mentor-sentence-prep-at-home-clipart"
                  width="150px"
                  height="150px"
                  className="writing-excercises-icons"
                />
                Shows To watch
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                activestyle={{ color: "red" }}
                to="/currentSubscriptions"
              >
                {" "}
                <img
                  src="https://i.pinimg.com/originals/29/24/7a/29247a536a10f8e38fcbe07cf0015241.png"
                  alt="65-656848-mentor-sentence-prep-at-home-clipart"
                  width="150px"
                  height="150px"
                  className="writing-excercises-icons"
                />
                Current Subscriptions
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
