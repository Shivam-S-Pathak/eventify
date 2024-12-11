import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const drawerWidth = 240;

const StudentNavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive screen detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1580);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle session and account data
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ParticipantUser");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        {["All Events", "My Events", "Settings"].map((text, index) => (
          <ListItem
            button
            key={text}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (index === 0) {
                navigate("/participants/homepage");
              } else if (index === 1) {
                navigate("/participant/my-events");
              } else if (index === 2) {
                navigate("/participant/settings");
              }
            }}
          >
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
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10, // Ensure navbar stays on top
      }}
    >
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          boxShadow: 4,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                display: "block",
                marginRight: 2,
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              flexGrow: 1,
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Participant's Panel - Welcome, {account.username}
          </Typography>

          {/* Notifications */}
          <IconButton sx={{ color: "white" }}>
            <NotificationIcon />
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              ml: 1,
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            {account?.username?.charAt(0).toUpperCase()}
          </Avatar>
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            position: "fixed",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              top: "64px",
              backgroundColor: "#f4f4f4",
              boxShadow: 2,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: "64px",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Toolbar />

      {/* Popover for Logout */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            sx={{
              bgcolor: "red",
              color: "white",
              width: "100%",
              "&:hover": {
                bgcolor: "darkred",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default StudentNavBar;
