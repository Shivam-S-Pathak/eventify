import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  LinearProgress,
  Avatar,
  Chip,
  Container,
  Tooltip,
  Fade,
  Divider,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";


const team = [
  {
    name: "Shivam Pathak",
    role: "Frontend Developer",
    desc: "Crafts beautiful and responsive UI for Eventify.",
    image: "./shivam.png",
    education: "B.Tech in Computer Science",
    technologies: [
      { tech: "React.js", level: 90 },
      { tech: "Material UI", level: 85 },
      { tech: "HTML/CSS/JS", level: 95 },
    ],
    color: "#3f51b5",
  },
  {
    name: "Nilay Singh",
    role: "Backend Developer",
    desc: "Handles backend logic, database, and APIs.",
    image: "./nilay.png",
    education: "B.Tech in Information Technology",
    technologies: [
      { tech: "Node.js", level: 88 },
      { tech: "Express.js", level: 85 },
      { tech: "MongoDB", level: 80 },
    ],
    color: "#4caf50",
  },
  {
    name: "Ayush Sengar",
    role: "Mobile App Developer",
    desc: "Developed the Android & iOS apps for Eventify.",
    image: "./ayush.png",
    education: "B.Tech in Computer Engineering",
    technologies: [
      { tech: "React Native", level: 85 },
      { tech: "Kotlin", level: 70 },
      { tech: "Firebase", level: 75 },
    ],
    color: "#ff9800",
  },
  {
    name: "Praveen Marskole",
    role: "Research & Documentation",
    desc: "Takes care of research, report creation & content.",
    image: "./praveen.png",
    education: "BBA in Business Analytics",
    technologies: [
      { tech: "MS Word", level: 95 },
      { tech: "Google Docs", level: 90 },
      { tech: "Research Tools", level: 85 },
    ],
    color: "#e91e63",
  },
];

const AboutUsSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Eventify
            </Link>
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
      <Box
        sx={{
          background: "linear-gradient(145deg, #f7f9fc 0%, #e3e9ff 100%)",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
        
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
                padding: "2.5rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                color: "#212121",
                fontFamily: "Poppins, sans-serif",
                lineHeight: 1.9,
                letterSpacing: "0.4px",
                maxWidth: "950px",
                margin: "3rem auto",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#3f51b5",
                  mb: 3,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    height: "4px",
                    width: "60px",
                    backgroundColor: "#f50057",
                    borderRadius: "2px",
                  },
                }}
              >
                🌟 About Eventify
              </Typography>

              <Typography variant="body1">
                <strong>Eventify</strong> is more than just a platform – it's
                your ultimate companion for discovering, managing, and
                organizing events that spark inspiration and connection. Crafted
                with passion and precision, Eventify bridges the gap between{" "}
                <em>creativity</em> and <em>convenience</em>, offering a vibrant
                space where participants and organizers unite.
                <br />
                <br />
                Whether you're a student exploring campus happenings, a creator
                hosting your first workshop, or an organizer planning a mega
                conference – Eventify equips you with smart tools and a
                delightfully intuitive experience to make every moment count.
                <br />
                <br />
                From dynamic listings and real-time tracking to stunning
                dashboards and seamless participation – Eventify redefines the
                event game. Our mission? To simplify event management and
                supercharge engagement, helping you craft events that people
                remember.
                <br />
                <br />
                🚀 Join the <strong>Eventify</strong> movement today and start
                turning ordinary events into unforgettable experiences – because
                every gathering deserves to shine.
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1a237e",
                position: "relative",
                display: "inline-block",
                mb: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "60%",
                  height: "4px",
                  bottom: "-8px",
                  left: "20%",
                  backgroundColor: "#5c6bc0",
                  borderRadius: "2px",
                  animation: "expand 2s ease-out",
                },
                "@keyframes expand": {
                  "0%": { width: "0%", left: "50%" },
                  "100%": { width: "60%", left: "20%" },
                },
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 3, color: "#5c6bc0", fontWeight: 400 }}
            >
              The talent behind Eventify
            </Typography>
          </Box>

        
          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in timeout={800}>
                  <Card
                    onClick={() => handleOpen(member)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "20px",
                      boxShadow: `0 8px 20px ${member.color}44`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: `0 12px 25px ${member.color}88`,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="260"
                      image={member.image}
                      alt={member.name}
                      sx={{
                        objectFit: "contain",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Avatar sx={{ bgcolor: member.color }}>
                          <CodeIcon />
                        </Avatar>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={member.color}
                        >
                          {member.name}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<SchoolIcon />}
                        label={member.role}
                        variant="outlined"
                        sx={{
                          mb: 1,
                          background: `${member.color}22`,
                          color: member.color,
                          fontWeight: 500,
                          borderRadius: "10px",
                        }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        "{member.desc}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>

        
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#f3f4f6",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={selectedMember?.color}
            >
              {selectedMember?.name}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              py={2}
            >
              <Avatar
                src={selectedMember?.image}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: `3px solid ${selectedMember?.color}`,
                }}
              />
              <Typography variant="subtitle1" gutterBottom color="text.primary">
                <strong>Role:</strong> {selectedMember?.role}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedMember?.desc}
              </Typography>
              <Typography variant="body1" gutterBottom>
                🎓 <strong>Education:</strong> {selectedMember?.education}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                gutterBottom
                color={selectedMember?.color}
              >
                🔧 Technologies & Skills
              </Typography>
              {selectedMember?.technologies.map((tech, idx) => (
                <Box key={idx} sx={{ width: "100%", mb: 1 }}>
                  <Typography variant="body2" fontWeight="500">
                    {tech.tech}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={tech.level}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: selectedMember.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default AboutUsSection;
