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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/signin" element={<StudentLogin />} />
          <Route path="/organiser/signin" element={<OrganiserLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
