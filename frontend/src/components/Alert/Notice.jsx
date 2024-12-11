import React from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
// import Textarea from "@mui/joy/Textarea";

const Notice = () => {
  return (
    <>
      <Box sx={{ height: "100vh", mt: 10, minWidth: "60vw" }}>
        <Typography sx={{ textAlign: "center", fontSize: "2rem", mb: 2 }}>
          Write Alert flash notices{" "}
        </Typography>
        <TextField
          label="Enter your message"
          name="Message"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={5} // Sets the initial height to 5 rows
        />
        <Box sx={{ textAlign: "right", mt: 1 }}>
          <Button
            sx={{
              bgcolor: "orange",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            Publish
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Notice;
