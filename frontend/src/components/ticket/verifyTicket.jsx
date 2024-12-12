import React, { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import Ticket from "./TicketLayout.jsx";
import { API } from "../../source/api.js";
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
          alert("ticket number is invalid");
        } else {
          console.error("Error verifying ticket:", error);
        }
      }
    } else {
      alert("ticket field can't be empty");
    }
  };

  return (
    <>
      <Box sx={{ height: "100vh", mt: 10, minWidth: "60vw" }}>
        <Typography sx={{ textAlign: "center", fontSize: "2rem", mb: 2 }}>
          Verify your refrence ticket number{" "}
        </Typography>
        <TextField
          sx={{ mb: 10 }}
          placeholder="Enter ticket number"
          name="EventName"
          variant="outlined"
          value={isTicket}
          onChange={(e) => setIsTicket(e.target.value)}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleVerify} sx={{ cursor: "pointer" }}>
                  Search
                </Button>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentTurnedInIcon sx={{ color: "orange" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box>{result ? <Ticket result={result} /> : ""}</Box>
      </Box>
    </>
  );
};

export default VerifyTicket;
