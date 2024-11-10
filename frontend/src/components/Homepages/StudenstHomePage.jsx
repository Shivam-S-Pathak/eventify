// StudentHomePage.jsx

import React from "react";
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

const StudentHomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("ParticipantUser"); 
    navigate("/student/signin");
  };

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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
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
