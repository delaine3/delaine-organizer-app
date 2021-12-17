import { useAuth } from "./firebase";
import { NavLink } from "react-router-dom";

//This is what appears if you are logged in. It offers links to various options.
export default function LoggedIn() {
  const currentUser = useAuth();

  return (
    <div>
      <div>Hey: {currentUser?.email} </div>
      <ul className="center icon-grid">
        <li className="nav-link">
          <NavLink activestyle={{ color: "red" }} to="/watch">
            {" "}
            <img
              src="https://icon-library.com/images/film-icon/film-icon-1.jpg"
              alt="65-656848-mentor-sentence-prep-at-home-clipart"
              width="150px"
              height="150px"
              className="writing-excercises-icons"
            />
            Shows{" "}
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink activestyle={{ color: "red" }} to="/randompost">
            {" "}
            <img
              src="https://i.ibb.co/RzmcpwH/soap-box-derby-soapbox-clip-art-openclipart-image-png-favpng-Pj-VB9ti-L1hnf45swquv-Ki5pcy.png"
              alt="soap-box-derby-soapbox-clip-art-openclipart-image-png-favpng-Pj-VB9ti-L1hnf45swquv-Ki5pcy"
              width="150px"
              height="150px"
              className="writing-excercises-icons"
            />
            Random Post{" "}
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink activestyle={{ color: "red" }} to="/activities">
            {" "}
            <img
              width="150px"
              height="150px"
              src="https://i.ibb.co/d4F201T/72-720902-this-is-an-image-of-a-clipboard-do.png"
              alt="72-720902-this-is-an-image-of-a-clipboard-do"
              className="writing-excercises-icons"
            />
            Things to do
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink activestyle={{ color: "red" }} to="/places">
            {" "}
            <img
              width="150px"
              height="150px"
              src="https://i.ibb.co/71YRj5P/location-maps-navigation-pin-place-icon-location-icon-position-934743.png"
              alt="location-maps-navigation-pin-place-icon-location-icon-position-934743"
              className="writing-excercises-icons"
            />
            Places to go
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
