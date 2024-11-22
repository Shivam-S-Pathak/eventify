import React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EastIcon from "@mui/icons-material/East";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";

const EventCards = [
  {
    img: "./party.jpg",
    title: "Party and Dancing",
    description: "Join us for an unforgettable experience",
  },
  {
    img: "./singing.jpg",
    title: "Singing",
    description: "Join us for an unforgettable experience",
  },
  {
    img: "./travelling.jpg",
    title: "Traveling and Picnic",
    description: "Join us for an unforgettable experience",
  },
  {
    img: "./sports.png",
    title: "Games and Sports",
    description: "Join us for an unforgettable experience",
  },
  {
    img: "./hacathons.jpg",
    title: "Tech fest and Hacakathons",
    description: "Join us for an unforgettable experience",
  },
  {
    img: "./manymore.png",
    title: "and explore many more events ",
    description: "Join us for an unforgettable experience",
  },
];

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }} color="black">
      {/* Hero Section */}
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("party-banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            gutterBottom
            color="white"
            fontWeight="bolder"
          >
            Discover, Register, Celebrate!
          </Typography>
          <Typography
            variant="h6"
            paragraph
            color="#F0F7EE"
            fontWeight="bolder"
          >
            Your one-stop solution for organizing and managing all college
            events.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#FFB627",
              color: "#22031F",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            onClick={handleOpenModal}
          >
            Get Started <EastIcon sx={{ ml: 1 }} />
          </Button>
        </Container>
      </Box>

      {/* Modal for Role Selection */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle align="center">Select Your Role</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SchoolIcon />}
              sx={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: "bold",
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
              }}
              onClick={() => {
                handleCloseModal();
                // Add navigation or action for student participant
                navigate("/student/signin");
              }}
            >
              Student Participant
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<GroupIcon />}
              sx={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: "bold",
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
              }}
              onClick={() => {
                handleCloseModal();
                // Add navigation or action for organizers
                navigate("/organiser/signin");
              }}
            >
              Organizers
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Featured Events Section */}
      <Box sx={{ py: 8, bgcolor: "#fff" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Events
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", align: "center" }}
          >
            {EventCards.map(({ title, img, description }, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card key={index}>
                  <img
                    src={img}
                    alt="event"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact/CTA Section */}
      <Box sx={{ py: 8, bgcolor: "#f7f7f7" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Ready to be a part of these Events?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Reach out to our team in case of any query related to college event!
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" size="large">
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: "#333", color: "#fff", textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} College Event Manager | All rights
          reserved
        </Typography>
      </Box>
    </Box>
  );
};
export default LandingPage;
