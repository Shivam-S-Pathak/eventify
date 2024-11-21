// OrganizerHomePage.jsx

import React, { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { API_URL } from "../../constants/config.js";
import axios from "axios"; // Use axios for API calls
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataContext } from "../../context/DataProvider.jsx";
// components
import EventList from "../events/EventList.jsx";

// Export extra icons
const MenuIcon = () => <span style={{ fontSize: "24px" }}>☰</span>;
const NotificationIcon = () => <span style={{ fontSize: "24px" }}>🔔</span>;
const AddIcon = () => (
  <span style={{ fontSize: "24px", color: "white" }}>➕</span>
);

const OrganizerHomePage = ({ setIsAuthenticated2, isAuthenticated2 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { account, setAccount } = useContext(DataContext);
  const [isload, setIsLoad] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated2) {
      const user = sessionStorage.getItem("OrganiserUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.user?.fullname && parsedUser.user?.email) {
          setAccount({
            username: parsedUser.user.fullname,
            email: parsedUser.user.email,
          });
        }
      }
    }
  }, [isAuthenticated2, setAccount]);

  const initialvals = {
    title: "",
    date: "",
    description: "",
  };

  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState(initialvals);
  const [isImage, setIsImage] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  
  const handleSignup=()=>{
  navigate("/organiser/signup")
  }

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const handleLogout = () => {
    sessionStorage.removeItem("OrganiserUser");
    setIsAuthenticated2(false);
  };

  const drawerWidth = 240;

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Events", "Participants", "Settings"].map((text, index) => (
          <ListItem button key={text} onClick={() => setTabValue(index)}>
            <ListItemIcon>
              {index === 0 ? (
                <EventIcon />
              ) : index === 1 ? (
                <PeopleIcon />
              ) : (
                <SettingsIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Organiser's panel welocome ,  {account.username}
          </Typography>
    
          <IconButton color="inherit">
            <NotificationIcon />
          </IconButton>
          <Avatar sx={{ ml: 1 }}>
            {account?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Button  sx={{ bgcolor: "green", color: "white" , mr:2 , ml:3 }} onClick={handleSignup}>Sign up new organiser</Button>
          <Button
            sx={{ bgcolor: "red", color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Event List */}
        <Box
          sx={{
            p: 3,
            width: "100%",
            marginTop: 3,
          }}
        >
          <EventList />
        </Box>

        {/* Add Event FAB */}
        <Fab
          aria-label="add"
          onClick={() => {
            setOpenAddEventDialog(true);
            setNewEvent(initialvals);
            setIsImage(null);
          }}
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
          <AddIcon />
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
