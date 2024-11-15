// OrganiserLogin.jsx

import React, { useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../source/api.js";

const OrganiserLogin = ({ setIsAuthenticated2 }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const loginIntialVals = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginIntialVals);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let response = await API.getOrganiserLogin(login);
      console.log("API Response:", response);
      if (response.isSuccess) {
        sessionStorage.setItem("OrganiserUser", JSON.stringify(response.data));
        setIsAuthenticated2(true);
        navigate("/organiser/homepage");
        setLogin(loginIntialVals);
      }
    } catch (error) {
      console.error("Error during login:", error.message || error);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleTabChange = () => {
    navigate("/student/signin");
  };
  return (
    <Container>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Tabs variant="fullWidth">
          <Tab
            label="Participant Login"
            sx={{ textWrap: "nowrap" }}
            onClick={handleTabChange}
          />

          <Tab
            label="Organizer Login"
            sx={{
              color: "white",
              bgcolor: "#7B2D26",
              borderRadius: "0 0.8rem 0 0",
            }}
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "25rem",
            margin: "1rem 0 1rem 0",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}
          >
            Organiser Login here
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                textAlign: "center",
                minWidth: "20rem",
                // bgcolor:"blue",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={login.email}
                onChange={handleChange}
                fullWidth
                sx={{ margin: "1rem 0 1rem 0" }}
                autoComplete="off"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                onChange={handleChange}
                value={login.password}
                fullWidth
                autoComplete="off"
                sx={{ margin: "1rem 0 1rem 0" }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  my: 2,
                  py: 1.2,
                  mb:6,
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  maxWidth: "100%",
                  bgcolor: "#7B2D26",
                  color: "white",
                }}
              >
                {loading ? "Loging in..." : "Login"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default OrganiserLogin;
