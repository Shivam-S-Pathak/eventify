import React, { useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

// Team data with enhanced information
const team = [
  {
    name: "Shivam Pathak",
    role: "Frontend Developer",
    desc: "Crafts beautiful and responsive UI for Eventify.",
    image: "./shivam.jpg",
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
    image: "./nilay.jpg",
    education: "B.Tech in Information Technology",
    technologies: [
      { tech: "Node.js", level: 88 },
      { tech: "Express.js", level: 85 },
      { tech: "MongoDB", level: 80 },
    ],
    color: "#4caf50",
  },
  {
    name: "Ayush Singh",
    role: "Mobile App Developer",
    desc: "Developed the Android & iOS apps for Eventify.",
    image: "./ayush.jpg",
    education: "B.Tech in Computer Engineering",
    technologies: [
      { tech: "React Native", level: 85 },
      { tech: "Kotlin", level: 70 },
      { tech: "Firebase", level: 75 },
    ],
    color: "#ff9800",
  },
  {
    name: "Praveen Singh",
    role: "Research & Documentation",
    desc: "Takes care of research, report creation & content.",
    image: "/api/placeholder/200/200",
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
    <Box
      sx={{
        background: "linear-gradient(145deg, #f7f9fc 0%, #e3e9ff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section with animated underline */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
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

        {/* Team Grid */}
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleOpen(member)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: `0 12px 50px rgba(${index * 20}, ${
                      index * 10
                    }, 255, 0.2)`,
                  },
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Colored top banner */}
                <Box sx={{ height: 8, bgcolor: member.color }} />

                <CardMedia
                  component="img"
                  height="180"
                  image={member.image}
                  alt={member.name}
                  sx={{ objectFit: "contain" }}
                />

                <CardContent sx={{ flexGrow: 1, pb: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontWeight: 600, color: member.color }}
                  >
                    {member.name}
                  </Typography>

                  <Chip
                    label={member.role}
                    size="small"
                    sx={{
                      mb: 2,
                      backgroundColor: `${member.color}15`,
                      color: member.color,
                      fontWeight: 500,
                    }}
                  />

                  <Typography variant="body2" color="text.secondary">
                    {member.desc}
                  </Typography>

                  {/* Preview chip for skills */}
                  <Box
                    sx={{ display: "flex", mt: 2, gap: 1, flexWrap: "wrap" }}
                  >
                    {member.technologies.slice(0, 2).map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech.tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: member.color,
                          color: "text.secondary",
                        }}
                      />
                    ))}
                    {member.technologies.length > 2 && (
                      <Chip
                        label={`+${member.technologies.length - 2}`}
                        size="small"
                        sx={{
                          bgcolor: `${member.color}30`,
                          color: member.color,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={400}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        {selectedMember && (
          <>
            <Box sx={{ height: 6, bgcolor: selectedMember.color }} />
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={selectedMember.image}
                  sx={{
                    width: 56,
                    height: 56,
                    border: `2px solid ${selectedMember.color}`,
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedMember.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {selectedMember.role}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleClose}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ py: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
              >
                <SchoolIcon color="action" fontSize="small" />
                <Typography variant="body1">
                  {selectedMember.education}
                </Typography>
              </Box>

              <Box
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <CodeIcon color="action" fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Skills & Technologies
                </Typography>
              </Box>

              {selectedMember.technologies.map((tech, idx) => (
                <Box key={idx} sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2">{tech.tech}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: selectedMember.color, fontWeight: 600 }}
                    >
                      {tech.level}%
                    </Typography>
                  </Box>
                  <Tooltip title={`${tech.level}% proficiency`} placement="top">
                    <LinearProgress
                      variant="determinate"
                      value={tech.level}
                      sx={{
                        height: 8,
                        borderRadius: 2,
                        backgroundColor: `${selectedMember.color}20`,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: selectedMember.color,
                        },
                      }}
                    />
                  </Tooltip>
                </Box>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AboutUsSection;
