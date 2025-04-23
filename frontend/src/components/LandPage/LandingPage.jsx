import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, transform } from "framer-motion";
import EastIcon from "@mui/icons-material/East";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.4) 100%), url("party-banner.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  padding: theme.spacing(20, 0),
  clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
}));

const StaggeredEventCard = styled(motion.div)(({ theme, index }) => ({
  display: "flex",
  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
  marginBottom: theme.spacing(8),
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.3s ease-in-out", // Only animating the transform property
  transformOrigin: "center", // Ensures scaling happens from the center
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const EventImage = styled(CardMedia)(({ theme }) => ({
  width: "50%",
  height: 400,
  clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
  transition: "transform 0.3s ease-in-out", // Smooth transition for scaling
  "&:hover": {
    transform: "scale(1.1)", // Slightly scales the image
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: 300,
    clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
  },
}));

const EventContent = styled(CardContent)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(8, 0),
  clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
}));

const GlowButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-50%",
    bottom: "-50%",
    left: "-50%",
    background:
      "linear-gradient(to bottom, rgba(229, 172, 142, 0), rgba(255,255,255,0.5) 50%, rgba(229, 172, 142, 0))",
    transform: "rotateZ(60deg) translate(-5em, 7.5em)",
    animation: "glowing 3s infinite",
  },
  "@keyframes glowing": {
    "0%": {
      transform: "rotateZ(60deg) translate(-5em, 7.5em)",
    },
    "100%": {
      transform: "rotateZ(60deg) translate(1em, -9em)",
    },
  },
}));

const EventCards = [
  {
    img: "./party.jpg",
    title: "Party and Dancing",
    description:
      "Immerse yourself in the rhythm of unforgettable nights. Our parties blend music, dance, and social connections, creating an electric atmosphere where memories are made and friendships are forged.",
  },
  {
    img: "./singing.jpg",
    title: "Singing Sensations",
    description:
      "From soulful ballads to energetic pop, our singing events are a stage for all voices. Whether you're a shower singer or a budding star, come share your passion for music and discover new talents.",
  },
  {
    img: "./travelling.jpg",
    title: "Adventure Awaits",
    description:
      "Embark on journeys that expand your horizons. Our travel and picnic events offer a perfect blend of exploration and relaxation, allowing you to create stories worth telling and experiences worth sharing.",
  },
  {
    img: "./sports.png",
    title: "Sports Spectacular",
    description:
      "Ignite your competitive spirit in our diverse sports events. Whether you're a team player or solo athlete, find your game and push your limits in a supportive and energizing environment.",
  },
  {
    img: "./hacathons.jpg",
    title: "Tech Titans Unite",
    description:
      "Dive into the future at our tech fests and hackathons. Collaborate with brilliant minds, tackle real-world challenges, and showcase your innovation. It's where ideas transform into impactful solutions.",
  },
  {
    img: "./manymore.png",
    title: "Endless Possibilities",
    description:
      "Your interests are as unique as you are. Discover a world of diverse events tailored to every passion - from art exhibitions to culinary workshops. There's always a new experience waiting for you.",
  },
];

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <AppBar
        position="related"
        color="transparent"
        elevation={0}
        sx={{ color: "purple" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Eventify
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      <HeroSection>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Discover, Register, Celebrate!
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{ mb: 4, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Your gateway to unforgettable college experiences.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <GlowButton
                variant="contained"
                size="large"
                onClick={handleOpenModal}
                sx={{ mr: 2, borderRadius: "50px", px: 4, m: 1 }}
              >
                Get Started <EastIcon sx={{ ml: 1 }} />
              </GlowButton>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/verify-ticket"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "50px",
                  px: 4,
                  m: 1,
                }}
              >
                Verify/Generate Ticket
              </Button>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      <Container sx={{ my: 12, color: "black" }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 8, color: "black" }}
        >
          Featured Events
        </Typography>
        {EventCards.map((event, index) => (
          <StaggeredEventCard
            key={index}
            index={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EventImage image={event.img} title={event.title} />
            <EventContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {event.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {event.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ alignSelf: "flex-start", borderRadius: "50px" }}
              >
                Learn More
              </Button>
            </EventContent>
          </StaggeredEventCard>
        ))}
      </Container>

      <Footer>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                About Eventify
              </Typography>
              <Typography variant="body2">
                Eventify is your ultimate platform for discovering, organizing,
                and experiencing college events. We connect students,
                organizers, and institutions to create unforgettable moments and
                foster a vibrant campus community.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Quick Links
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                to="/events"
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                All Events
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                to="/about"
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                About Us
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                to="/contact"
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                to="/privacy"
                color="inherit"
                display="block"
              >
                Privacy Policy
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Connect With Us
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton
                  color="inherit"
                  aria-label="Facebook"
                  sx={{ mr: 1 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter" sx={{ mr: 1 }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Instagram"
                  sx={{ mr: 1 }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" sx={{ mt: 8 }}>
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </Typography>
        </Container>
      </Footer>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: isMobile ? 16 : 24,
          },
        }}
      >
        <DialogTitle
          align="center"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Select Your Role
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SchoolIcon />}
              onClick={() => {
                handleCloseModal();
                navigate("/student/signin");
              }}
              sx={{ borderRadius: "50px", py: 1.5 }}
            >
              Student Participant
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<GroupIcon />}
              onClick={() => {
                handleCloseModal();
                navigate("/organiser/signin");
              }}
              sx={{ borderRadius: "50px", py: 1.5 }}
            >
              Organizers
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
