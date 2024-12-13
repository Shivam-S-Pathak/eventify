import React, { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { API } from "../../source/api.js";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
// import Textarea from "@mui/joy/Textarea";

const Notice = () => {
  const [isAlert, setIsAlert] = useState("");
  const [sending, setSending] = useState(false);
  const handlePublish = async () => {
    if (isAlert !== "") {
      setSending(true);
      try {
        let response = await API.getAlert({ isAlert });
      } catch (error) {}
    } else {
      alert("Enter some sos message ");
    }
    setSending(false);
    alert("your sos message has been sent");
  };

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
          value={isAlert}
          onChange={(e) => setIsAlert(e.target.value)}
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
            onClick={handlePublish}
          >
            {sending ? "Publishing..." : "Publish"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Notice;
