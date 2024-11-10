// StudentSignup.jsx

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
// import Alert from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../source/api.js";

const signUpVals = {
  fullname: "",
  email: "",
  password: "",
};

const StudentSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");

  const [signup, setSignUp] = useState(signUpVals);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // let response = await API.getOrganiserSignup(signup);
      if (response.isSuccess) {
        navigate("/student/signin");
        setSignUp(signUpVals);
      }
      setLoading(false);
    } catch (error) {
      if (error.code === 400) {
        setError("*email is already exists");
      } else {
        setError("*An error occurred during signup. Please try again.");
      }

      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
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
            sx={{ fontWeight: 600, color: "text.primary", mb: 3, mt: 3 }}
          >
            Organiser signup here
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
                label="Fullname"
                type="text"
                variant="outlined"
                name="fullname"
                value={signup.fullname}
                fullWidth
                sx={{ margin: "1rem 0 1rem 0" }}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                fullWidth
                value={signup.email}
                sx={{ margin: "1rem 0 1rem 0" }}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={signup.password}
                fullWidth
                sx={{ margin: "1rem 0 1rem 0" }}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errors && (
                <Typography sx={{ color: "red", mb: 2 }}>{errors}</Typography>
              )}
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
                {loading ? "Singing in...." : "Sign up"}
              </Button>
            </Box>
          </form>
        </Box>
        <Typography sx={{ color: "black", pb: 1 }}>
          Already have an account?
          <Link to="/student/signin">Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default StudentSignup;
