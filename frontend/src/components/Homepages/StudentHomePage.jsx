import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

// Sample events data
const upcomingEvents = [
  {
    title: "Cultural Fest",
    description: "A celebration of art and culture",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Science Fair",
    description: "Explore the wonders of science and innovation",
    image: "https://source.unsplash.com/random/800x602",
  },
];

const ongoingEvents = [
  {
    title: "Tech Symposium",
    description: "Showcase of innovation and technology",
    image: "https://source.unsplash.com/random/800x601",
  },
  {
    title: "Business Summit",
    description: "Networking with top industry leaders",
    image: "https://source.unsplash.com/random/800x603",
  },
];

// Icons for sidebar
const MenuIcon = () => <span style={{ fontSize: "24px" }}>☰</span>;
const NotificationIcon = () => <span style={{ fontSize: "24px" }}>🔔</span>;
const EventIcon = () => <span style={{ fontSize: "24px" }}>📅</span>;
const DiscoverIcon = () => <span style={{ fontSize: "24px" }}>🔍</span>;
const SettingsIcon = () => <span style={{ fontSize: "24px" }}>⚙️</span>;

const theme = createTheme({
  palette: {
    primary: { main: "#6200ea" },
    secondary: { main: "#03dac6" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

const drawerWidth = 240;

const StudentHomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { account, setAccount } = useContext(DataContext);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    sessionStorage.removeItem("ParticipantUser");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = sessionStorage.getItem("ParticipantUser");
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
  }, [isAuthenticated, setAccount]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "My Events", icon: <EventIcon /> },
          { text: "Discover", icon: <DiscoverIcon /> },
          { text: "Notifications", icon: <NotificationIcon /> },
          { text: "Settings", icon: <SettingsIcon /> },
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Event Management
            </Typography>
            <IconButton color="inherit">
              <NotificationIcon />
            </IconButton>
            <Avatar sx={{ ml: 1 }}>S</Avatar>
            <Button
              onClick={handleLogout}
              sx={{ color: "white", bgcolor: "red", mx: 2 }}
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%", // Take up remaining width
          }}
        >
          <Toolbar />
          <Container
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%", // Full width
              maxWidth: "100%", // Prevent container from limiting width
              padding: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome back, {account.username}!
            </Typography>

            {/* Upcoming Events Section */}
            <Box sx={{ mt: 4, width: "100%", ml: 4 }}>
              <Typography variant="h5" gutterBottom>
                Upcoming Events
              </Typography>
              <Grid container spacing={2}>
                {upcomingEvents.map((event, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        boxShadow: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}
                        height="160"
                      />
                      <CardContent>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button variant="outlined" color="secondary">
                          Learn More
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Ongoing Events Section */}
            <Box sx={{ mt: 6, width: "100%", ml: 4 }}>
              <Typography variant="h5" gutterBottom>
                Ongoing Events
              </Typography>
              <Grid container spacing={2}>
                {ongoingEvents.map((event, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        boxShadow: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}
                        height="160"
                      />
                      <CardContent>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary">
                          Register
                        </Button>
                        <Button variant="outlined" color="secondary">
                          Learn More
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StudentHomePage;
