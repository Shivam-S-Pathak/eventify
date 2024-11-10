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
import Login from "./components/Account/Login.jsx";
import LandingPage from "./components/Account/LandPage/LandingPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
