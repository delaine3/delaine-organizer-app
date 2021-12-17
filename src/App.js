//import Auth from "./auth";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import RandomPost from "./makeRandomPost";
import CurrentSubScriptions from "./CurrentSubScriptions";
import ShowsToWatch from "./ShowsToWatch";
import Dashboard from "./dashboard";
import Activities from "./activities";
import Places from "./places";
import ChangeProfilePic from "./changeProfilePic";
import Watch from "./watch";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Dashboard />
            </div>
          }
        ></Route>{" "}
        <Route
          path="/randompost"
          element={
            <div>
              <RandomPost />
            </div>
          }
        ></Route>
        <Route
          path="/currentSubscriptions"
          element={
            <div>
              <CurrentSubScriptions />
            </div>
          }
        ></Route>
        <Route
          path="/showsToWatch"
          element={
            <div>
              <ShowsToWatch />
            </div>
          }
        ></Route>
        <Route
          path="/watch"
          element={
            <div>
              <Watch />
            </div>
          }
        ></Route>
        <Route
          path="/activities"
          element={
            <div>
              <Activities />
            </div>
          }
        ></Route>
        <Route
          path="/places"
          element={
            <div>
              <Places />
            </div>
          }
        ></Route>
        <Route
          path="/changeProfilePic"
          element={
            <div>
              <ChangeProfilePic />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}
