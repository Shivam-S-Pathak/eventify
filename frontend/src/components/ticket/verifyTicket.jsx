import React, { useState } from "react";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Ticket from "./TicketLayout.jsx";
import { API } from "../../source/api.js";
import { Link } from "react-router-dom";

const VerifyTicket = () => {
  const [isTicket, setIsTicket] = useState("");
  const [result, setResult] = useState("");
  const [Load, setLoad] = useState(false);

  const handleVerify = async () => {
    setLoad(true);
    if (isTicket) {
      try {
        let response = await API.generateIdCard({ isTicket });
        if (response) {
          setResult(response.data.Idcard);
        }
        setLoad(false);
      } catch (error) {
        if (error.code === 404) {
          alert("Ticket number is invalid");
          setLoad(false);
        } else {
          console.error("Error verifying ticket:", error);
          setLoad(false);
        }
      }
    } else {
      alert("Ticket field can't be empty");
    }
  };

  return (
    <>
      <AppBar
        position="related"
        color="transparent"
        elevation={0}
        sx={{ color: "purple" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Eventify
            </Link>
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        // elevation={4}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          // background: "#f9f9f9",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "2.5rem",
            mb: 4,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Verify Your Reference Ticket Number
        </Typography>

        <TextField
          placeholder="Enter ticket number"
          name="EventName"
          variant="outlined"
          value={isTicket}
          onChange={(e) => setIsTicket(e.target.value)}
          fullWidth
          required
          sx={{
            mb: 4,
            maxWidth: 500,
            backgroundColor: "#fff",
            borderRadius: 1,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleVerify}
                  variant="contained"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "purple",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "white",
                      color:"purple"
                    },
                  }}
                >
                  {Load ? "Searching..." : "Search"}
                </Button>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentTurnedInIcon sx={{ color: "purple" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {result ? <Ticket result={result} /> : null}
        </Box>
      </Paper>
    </>
  );
};

export default VerifyTicket;
