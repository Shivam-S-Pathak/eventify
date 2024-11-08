// Login.jsx

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

const Login = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderLoginForm = (role) => (
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
        {role} Login
      </Button>
    </Box>
  );

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
          value={activeTab}
          onChange={handleChange}
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
          <Tab label="Participant Login" sx={{ textWrap: "nowrap" }} />
          <Tab label="Organizer Login" />
        </Tabs>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}
          >
            {activeTab === 0 ? "Participant Login" : "Organizer Login"}
          </Typography>
          {activeTab === 0
            ? renderLoginForm("Participant")
            : renderLoginForm("Organizer")}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
