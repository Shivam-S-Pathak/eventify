import React, { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Ticket from "./TicketLayout.jsx";
import { API } from "../../source/api.js";
import { Link } from "react-router-dom";

const VerifyTicket = () => {
  const [isTicket, setIsTicket] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    if (isTicket) {
      try {
        let response = await API.generateIdCard({ isTicket });
        if (response) {
          setResult(response.data.Idcard);
        }
      } catch (error) {
        if (error.code === 404) {
          alert("Ticket number is invalid");
        } else {
          console.error("Error verifying ticket:", error);
        }
      }
    } else {
      alert("Ticket field can't be empty");
    }
  };

  return (
    <>
      <Link to="/">
        <Button sx={{bgcolor:"orange" , color:"white"}}>
          {" "}
          <HomeIcon />
          Home
        </Button>
        
      </Link>
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
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#fb8c00",
                    },
                  }}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentTurnedInIcon sx={{ color: "#ff9800" }} />
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
