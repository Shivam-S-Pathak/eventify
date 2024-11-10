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
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let response = await API.getStudentLogin();
    if (response.isSuccess) {
    }
  };
  const handletabChange = () => {
    navigate("/organiser/signin");
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
            sx={{ textWrap: "nowrap", color: "white", bgcolor: "#7B2D26" }}
          />

          <Tab label="Organizer Login" onClick={handletabChange} />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth:"25rem",
            margin:"1rem 0 1rem 0"
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
              component="form"
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
                fullWidth
                sx={{ margin: "1rem 0 1rem 0" }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ margin: "1rem 0 1rem 0" }}
              />
              <Button
                variant="contained"
                fullWidth
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
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentLogin;
