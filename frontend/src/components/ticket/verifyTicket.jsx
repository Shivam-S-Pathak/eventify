import React from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";

import Ticket from "./TicketLayout.jsx";

const VerifyTicket = () => {
  return (
    <>
      <Box sx={{ height: "100vh", mt: 10,minWidth: "60vw" }}>
        <Typography sx={{ textAlign: "center", fontSize: "2rem", mb: 2 }}>
          Verify your refrence ticket number{" "}
        </Typography>
        <TextField
        sx={{mb:10}}
          placeholder="Enter ticket number"
          name="EventName"
          variant="outlined"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button>Search</Button>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentTurnedInIcon sx={{ color: "orange" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <Ticket />
        </Box>
      </Box>
    </>
  );
};

export default VerifyTicket;
