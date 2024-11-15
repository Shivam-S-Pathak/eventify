// OrganizerHomePage.jsx

import React, { useContext, useState, useEffect } from "react";
import { API } from "../../source/api.js";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

// Export extra icons
const MenuIcon = () => <span style={{ fontSize: "24px" }}>☰</span>;
const NotificationIcon = () => <span style={{ fontSize: "24px" }}>🔔</span>;
const EventIcon = () => <span style={{ fontSize: "24px" }}>📅</span>;
const PeopleIcon = () => <span style={{ fontSize: "24px" }}>👥</span>;
const SettingsIcon = () => <span style={{ fontSize: "24px" }}>⚙️</span>;
const SearchIcon = () => <span style={{ fontSize: "24px" }}>🔍</span>;
const AddIcon = () => (
  <span style={{ fontSize: "24px", color: "white" }}>➕</span>
);
const DeleteIcon = () => <span style={{ fontSize: "24px" }}>🗑️</span>;
const ViewIcon = () => <span style={{ fontSize: "24px" }}>👁️</span>;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const drawerWidth = 240;

const OrganizerHomePage = ({ setIsAuthenticated2, isAuthenticated2 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { account, setAccount } = useContext(DataContext);

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

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (newEvent.title && newEvent.date && newEvent.description) {
      // Prepare FormData
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("date", newEvent.date);
      formData.append("description", newEvent.description);
      // formData.append("tag", newEvent.tag);
      if (isImage) {
        formData.append("image", isImage); // Append image file to FormData
      }

      try {
        // Send POST request to the backend with FormData
        let response = await API.setData(formData);
        console.log("Event added successfully:", response.data);
        // Clear form and close dialog after successful submission
        setNewEvent(initialvals);
        setIsImage(null);
        setOpenAddEventDialog(false);
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Organiser's panel
            </Typography>
            <IconButton color="inherit">
              <NotificationIcon />
            </IconButton>
            <Avatar sx={{ ml: 1 }}>
              {account?.username
                ? account.username.charAt(0).toUpperCase()
                : ""}
            </Avatar>
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Fab
              aria-label="add"
              onClick={() => setOpenAddEventDialog(true)}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                bgcolor: "yellow",
              }}
            >
              <AddIcon />
            </Fab>
            {/* Add Event Dialog */}
            <Dialog
              open={openAddEventDialog}
              onClose={() => setOpenAddEventDialog(false)}
              aria-labelledby="add-event-dialog-title"
            >
              <DialogTitle id="add-event-dialog-title">
                Add New Event
              </DialogTitle>

              <form onSubmit={handleAddEvent}>
                <DialogContent>
                  <TextField
                    margin="dense"
                    label="Event Name"
                    fullWidth
                    variant="outlined"
                    value={newEvent.title}
                    name="title"
                    onChange={handleChange}
                  />
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
                  />
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
                  />
                  Upload Event Image
                  <input
                    type="file"
                    onChange={(e) => setIsImage(e.target.files[0])}
                    name="imageLink"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenAddEventDialog(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add Event
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OrganizerHomePage;
