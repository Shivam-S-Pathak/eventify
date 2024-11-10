import { useState } from "react";

import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//componennts
import StudentLogin from "./components/Account/StudentLogin.jsx";
import OrganiserLogin from "./components/Account/OrganiserLogin.jsx";
import LandingPage from "./components/LandPage/LandingPage.jsx";
import StudentSignup from "./components/Account/StudentsSignup.jsx";
import StudentHomePage from "./components/Homepages/StudentHomePage.jsx";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const aT = sessionStorage.getItem("ParticipantUser");
  const [isAuthenticated, setIsAuthenticated] = useState(aT ? true : false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/student/signin"
            element={
              <StudentLogin
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route path="/organiser/signin" element={<OrganiserLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route
            path="/participants/homepage"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route
              path="/participants/homepage"
              element={<StudentHomePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
