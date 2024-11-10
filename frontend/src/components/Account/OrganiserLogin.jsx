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

const OrganiserLogin = () => {


  const handleSubmit = async () => {
    let response = await API.getOrganiserLogin();
    if (response.isSuccess) {
    }
  };

  return (
    <Container>
      <Box
        // elevation={20}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Tabs
         
          variant="fullWidth"
          textColor="inherit"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#7B2D26", // custom color
            },

            color: "#7B2D26",
            fontWeight: "bold",
          }}
        >
          <Tab label="Participant OrganiserLogin" sx={{ textWrap: "nowrap" }} />
          <Tab label="Organizer OrganiserLogin" />
        </Tabs>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}
          >
            
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: "100%" }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: "100%" }}
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
                  color: "#D7C9AA",
                }}
              >
                Organiser Login
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default OrganiserLogin;
