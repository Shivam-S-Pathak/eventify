// StudentHomePage.jsx

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Fab,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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

const StudentHomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const user = sessionStorage.getItem("ParticipantUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (
          parsedUser.user?.fullname &&
          parsedUser.user?.email &&
          parsedUser.user?.id
        ) {
          setAccount({
            username: parsedUser.user.fullname,
            email: parsedUser.user.email,
            id: parsedUser.user.id,
          });
        }
      }
    }
  }, [isAuthenticated, setAccount]);

  const initialvals = {
    title: "",
    date: "",
    description: "",
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignup = () => {
    navigate("/organiser/signup");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("OrganiserUser");
    setIsAuthenticated(false);
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
            Participant's panel welocome , {account.username}
          </Typography>

          <IconButton color="inherit">
            <NotificationIcon />
          </IconButton>
          <Avatar sx={{ ml: 1 }}>
            {account?.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Button
            sx={{ bgcolor: "red", color: "white", ml: 2 }}
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
      </Box>
    </Box>
  );
};

export default StudentHomePage;
