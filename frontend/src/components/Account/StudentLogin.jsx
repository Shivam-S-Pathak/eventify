// StudentLogin.jsx

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
import { API } from "../../source/api.js";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = ({ setIsAuthenticated }) => {
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
      let response = await API.getStudentLogin(login);
      console.log("API Response:", response);
      if (response.isSuccess) {
        sessionStorage.setItem(
          "ParticipantUser",
          JSON.stringify(response.data)
        );
        setIsAuthenticated(true);
        navigate("/participants/homepage");
        setLogin(loginIntialVals);
      }
    } catch (error) {
      console.error("Error during login:", error.message || error);
      setLoading(false);
    }
    setLoading(false);
  };
  const handletabChange = () => {
    navigate("/organiser/signin");
  };
  return (
    <>
      {" "}
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
              sx={{
                textWrap: "nowrap",
                color: "white",
                bgcolor: "#7B2D26",
                borderRadius: "0.8rem 0 0 0",
              }}
            />

            <Tab label="Organizer Login" onClick={handletabChange} />
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
              Participant Login here
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
          <Typography sx={{ color: "black", pb: 1 , textAlign:"center"}}>
            Didn't have an account?
            <Link to="/student/signup">Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default StudentLogin;
