import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Popover,
  useMediaQuery,
} from "@mui/material";
import { API } from "../../source/api";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorIcon from "@mui/icons-material/Error";
import MenuIcon from "@mui/icons-material/Menu";
import { DataContext } from "../../context/DataProvider";

const OrganiserNavBar = ({ isAuthenticated2, setIsAuthenticated2 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { account, setAccount } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [notiCount, setNotiCount] = useState("");
  const drawerWidth = 240;
  const navigate = useNavigate();

  // Detect if the screen width is less than or equal to 1580px
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1580);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const getNotification = async () => {
      let response = await API.getNoti();

      setNotiCount(response.data.count);
    };
    getNotification();
  }, [isAuthenticated2, setAccount]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("OrganiserUser");
    setIsAuthenticated2(false);
    navigate("/");
    setAnchorEl(null);
  };

  const handleNotiClick = () => {
    navigate("/organiser/pending-requests");
  };

  const handleSignup = () => {
    navigate("/organiser/signup");
    setAnchorEl(null);
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
        {["Events", "Participants", "Alert Notice", "Settings"].map(
          (text, index) => (
            <ListItem
              button
              key={text}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (index === 0) {
                  navigate("/organiser/homepage");
                } else if (index === 1) {
                  navigate("/organiser/view-participants");
                } else if (index === 3) {
                  navigate("/organiser/settings");
                } else if (index === 2) {
                  navigate("/organiser/notice");
                }
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <EventIcon />
                ) : index === 1 ? (
                  <PeopleIcon />
                ) : index === 2 ? (
                  <TaskAltIcon />
                ) : index === 3 ? (
                  <ErrorIcon />
                ) : (
                  <SettingsIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
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
          width: `100%`,
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
            Organizer's Panel - Welcome, {account.username}
          </Typography>

          <Button
            onClick={handleNotiClick}
            sx={{
              color: "white",
              bgcolor: "red",
              borderRadius: "1rem  0 1rem 0",
              mr: 2,
            }}
          >
            {" "}
            <span style={{ fontSize: "24px" }}>🔔 {notiCount}</span>
          </Button>
          {/* Avatar */}
          <Avatar
            sx={{
              ml: 1,
              cursor: "pointer",
              fontSize: isMobile ? "1rem" : "1.5rem",
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
              bgcolor: "green",
              color: "white",
              width: "100%",
              mb: 2,
              "&:hover": {
                bgcolor: "darkgreen",
              },
            }}
            onClick={handleSignup}
          >
            Sign up new organizer
          </Button>
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

export default OrganiserNavBar;
