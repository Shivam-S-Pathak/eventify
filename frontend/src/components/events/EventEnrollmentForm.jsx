import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

import { DataContext } from "../../context/DataProvider";
import { API_URL } from "../../constants/config";
import axios from "axios";

const EnrollmentForm = ({ open, handleClose, evtName }) => {
  const { account } = useContext(DataContext);

  // Consolidated state for form fields
  const initialvals = {
    EventName: "",
    email: "",
    createdBy: account.id, // Set `createdBy` directly here
  };
  const [details, setDetails] = useState(initialvals);
  const [isImage, setIsImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };
      console.log("Updated Details:", updatedDetails);
      return updatedDetails;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Debugging values before validation
    console.log("Details before submission:", details);
    console.log("Image:", isImage);

    // Validation
    if (
      !details.EventName ||
      !details.email ||
      !details.createdBy ||
      !isImage
    ) {
      alert("All fields including image are required!");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("EventName", details.EventName);
    formData.append("email", details.email);
    formData.append("createdBy", details.createdBy);
    formData.append("ReciptImage", isImage);

    console.log("FormData before submission:", formData);

    // Submit the form data
    try {
      const response = await axios.post(`${API_URL}/enroll`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event added successfully:", response.data);

      // Reset form fields after successful submission
      setDetails(initialvals);
      setIsImage(null);
      handleClose(); // Close the dialog
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}
      >
        Enroll for the {evtName}
        <Typography sx={{ mt: 1, color: "green" }}>
          {account.username}, please fill your details below
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Event Name"
              name="EventName"
              value={details.EventName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
              Note: *Give your correct email for verification purposes
            </Typography>
            <TextField
              label="Email"
              name="email"
              value={details.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              type="email"
            />
            <Box
              component="img"
              src="/upi.jpg"
              alt="Example Image"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>
              Please upload the payment receipt here
            </Typography>
          </Box>
          <Box display="flex" gap={2} flexDirection="row">
            <Button
              variant="contained"
              component="label"
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                padding: "10px 20px",
                "&:hover": {
                  background: "linear-gradient(to right, #2575fc, #6a11cb)",
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                },
                "& .MuiButton-label": {
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            >
              Upload Event Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setIsImage(e.target.files[0])}
              />
            </Button>
            {isImage && (
              <Typography
                variant="body2"
                sx={{ fontWeight: "900", color: "#333" }}
              >
                {isImage.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#f50057",
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            sx={{
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#2575fc",
                color: "#fff",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnrollmentForm;
