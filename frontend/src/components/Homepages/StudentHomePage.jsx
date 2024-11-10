// StudentHomePage.jsx

import React, { useContext, useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

import { DataContext } from "../../context/DataProvider";
const events = [
  {
    title: "Cultural Fest",
    description: "A celebration of art and culture",
    image: "path/to/image1.jpg",
  },
  {
    title: "Tech Symposium",
    description: "Showcase of innovation and technology",
    image: "path/to/image2.jpg",
  },
  // ... more events
];

const StudentHomePage = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(DataContext);
  const handleLogout = () => {
    sessionStorage.removeItem("ParticipantUser");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleClick = () => {
    navigate("/organiser/signup");
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
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#7B2D26" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            College Event Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="inherit" onClick={handleClick}>
            organiser Sing up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
        <Typography sx={{ color: "black" }}>
          Hello {account.username}
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          Ongoing Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Register
                  </Button>
                  <Button size="small" color="secondary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default StudentHomePage;
