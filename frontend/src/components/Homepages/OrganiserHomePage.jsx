import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constants/config.js";
import { DataContext } from "../../context/DataProvider.jsx";
import OrganiserEventList from "../events/organiserEventList.jsx";

const OrganizerHomePage = ({
  setIsAuthenticated2,
  isAuthenticated2,
  isRegister,
  setIsregister,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { account, setAccount } = useContext(DataContext);
  const [isload, setIsLoad] = useState(false);
  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [isImage, setIsImage] = useState(null);
  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    if (isAuthenticated2) {
      const user = sessionStorage.getItem("OrganiserUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        setAccount({
          username: parsedUser.user?.fullname || "",
          email: parsedUser.user?.email || "",
        });
      }
    }
  }, [isAuthenticated2, setAccount]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleChange = (e) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsLoad(true);

    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.description ||
      !isImage
    ) {
      alert("All fields including image are required!");
      setIsLoad(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("date", newEvent.date);
    formData.append("description", newEvent.description);
    formData.append("image", isImage);

    try {
      const response = await axios.post(`${API_URL}/event/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event added successfully:", response.data);
      setNewEvent({ title: "", date: "", description: "" });
      setIsImage(null);
      setOpenAddEventDialog(false);
      setIsLoad(false);
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response?.data || error.message
      );
      setIsLoad(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <OrganiserEventList
        isRegister={isRegister}
        setIsregister={setIsregister}
      />

      <Box sx={{ flexGrow: 1 }}>
        {/* Content */}

        {/* Add Event FAB */}
        <Fab
          aria-label="add"
          onClick={() => setOpenAddEventDialog(true)}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "yellow",
            "&:hover": {
              background: "linear-gradient(to right, #2575fc, #6a11cb)",
            },
          }}
        >
          ➕
        </Fab>

        {/* Add Event Dialog */}
        <Dialog
          open={openAddEventDialog}
          onClose={() => {
            setOpenAddEventDialog(false);
            setNewEvent(initialvals);
            setIsImage(null);
          }}
          aria-labelledby="add-event-dialog-title"
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
            id="add-event-dialog-title"
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}
          >
            Add New Event
          </DialogTitle>
          <form onSubmit={handleAddEvent}>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Event Name */}
                <TextField
                  margin="dense"
                  label="Event Name"
                  fullWidth
                  variant="outlined"
                  value={newEvent.title}
                  name="title"
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#444",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                  }}
                />

                {/* Event Date */}
                <TextField
                  margin="dense"
                  label="Event Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={newEvent.date}
                  name="date"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#444",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                  }}
                />

                {/* Event Description */}
                <TextField
                  margin="dense"
                  label="Event Description"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={newEvent.description}
                  name="description"
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#444",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6a11cb",
                    },
                  }}
                />

                {/* File Upload */}
                <Box display="flex" gap={2} flexDirection="row">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      background: "linear-gradient(to right, #6a11cb, #2575fc)",
                      padding: "10px 20px",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #2575fc, #6a11cb)",
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
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenAddEventDialog(false);
                  setNewEvent(initialvals);
                  setIsImage(null);
                }}
                color="secondary"
                sx={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#f50057",
                    color: "#fff",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isload}
                sx={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#2575fc",
                    color: "#fff",
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {isload ? "Adding..." : "Add Event"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
};

export default OrganizerHomePage;
