import React, { useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EastIcon from "@mui/icons-material/East";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing motion

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
    title: "Tech fest and Hackathons",
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
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Hero Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url("party-banner.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            textAlign: "center",
            width: "100vw",
          }}
        >
          <Container>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              Discover, Register, Celebrate!
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                mb: 4,
                fontWeight: 500,
                color: "#f0f0f0",
                textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              Your one-stop solution for organizing and managing all college
              events.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #ff9800, #f44336)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 4,
                textTransform: "capitalize",
                boxShadow: "0 4px 10px rgba(255, 87, 34, 0.5)",
                "&:hover": {
                  background: "linear-gradient(45deg, #f57c00, #e53935)",
                },
              }}
              onClick={handleOpenModal}
            >
              Get Started <EastIcon sx={{ ml: 1 }} />
            </Button>
          </Container>
        </Box>
      </motion.div>

      {/* Modal for Role Selection */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          align="center"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Select Your Role
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<SchoolIcon />}
              sx={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: "bold",
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
                bgcolor: "#4CAF50",
                color: "#fff",
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#388E3C",
                },
              }}
              onClick={() => {
                handleCloseModal();
                navigate("/student/signin");
              }}
            >
              Student Participant
            </Button>
            <Button
              variant="contained"
              startIcon={<GroupIcon />}
              sx={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: "bold",
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
                bgcolor: "#FF5722",
                color: "#fff",
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#E64A19",
                },
              }}
              onClick={() => {
                handleCloseModal();
                navigate("/organiser/signin");
              }}
            >
              Organizers
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Featured Events Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Box sx={{ py: 8, bgcolor: "#f9f9f9" }}>
          <Container>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
            >
              Featured Events
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {EventCards.map(({ title, img, description }, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={img}
                      alt={title}
                      sx={{
                        width: "100%", // Make the image full width
                        objectFit: "cover", // Ensure it covers the container proportionally
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {title}
                      </Typography>
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
      </motion.div>

      {/* Contact/CTA Section with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            background: "linear-gradient(45deg, #ffeb3b, #fdd835)",
            color: "#333",
          }}
        >
          <Container>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
            >
              Ready to be a part of these Events?
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Reach out to our team in case of any query related to college
              events!
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ff9800",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f57c00" },
              }}
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LandingPage;
