import { useState } from "react";
import DataProvider from "./context/DataProvider.jsx";
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
import OrganiserSignup from "./components/Account/OrganiserSignup.jsx";
import OrganizerHomePage from "./components/Homepages/OrganiserHomePage.jsx";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};
const PrivateRoute2 = ({ isAuthenticated2, setIsAuthenticated2 }) => {
  return isAuthenticated2 ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const aT = sessionStorage.getItem("ParticipantUser");
  const aT2 = sessionStorage.getItem("OrganiserUser");
  const [isAuthenticated, setIsAuthenticated] = useState(aT ? true : false);
  const [isAuthenticated2, setIsAuthenticated2] = useState(aT2 ? true : false);

  return (
    <>
      <DataProvider>
        {" "}
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
            <Route
              path="/organiser/signin"
              element={
                <OrganiserLogin
                  isAuthenticated2={isAuthenticated2}
                  setIsAuthenticated2={setIsAuthenticated2}
                />
              }
            />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/organiser/signup" element={<OrganiserSignup />} />
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
                element={
                  <StudentHomePage
                    setIsAuthenticated={setIsAuthenticated}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
            </Route>
            <Route
              path="/organiser/homepage"
              element={
                <PrivateRoute2
                  isAuthenticated2={isAuthenticated2}
                  setIsAuthenticated2={setIsAuthenticated2}
                />
              }
            >
              <Route
                path="/organiser/homepage"
                element={
                  <OrganizerHomePage
                    setIsAuthenticated2={setIsAuthenticated2}
                    isAuthenticated2={isAuthenticated2}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
