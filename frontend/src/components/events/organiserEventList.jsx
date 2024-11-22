import React, { useEffect, useState } from "react";
import { API } from "../../source/api.js";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OrganiserEventList = ({ setIsregister, isRegister }) => {
  const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setIsregister(!isRegister);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getData();
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Upcoming Events
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        gutterBottom
        color="textSecondary"
      >
        Explore the latest events and enroll now!
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                bgcolor: isRegister ? "grey" : "",
                maxWidth: 320,
                margin: "0 auto",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={event.imageLink}
                alt={event.title}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {event.description.length > 100
                    ? `${event.description.substring(0, 100)}...`
                    : event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {/* Enroll Now Button */}
                  {isRegister ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        bgcolor: "linear-gradient(135deg, #2575fc, #6a11cb)",
                        "&:hover": {
                          bgcolor: "linear-gradient(135deg, #1e62d5, #551a8b)",
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        },
                        transition:
                          "background 0.3s, transform 0.3s, box-shadow 0.3s",
                        borderRadius: 4,
                        textTransform: "none",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={handleClose}
                    >
                      Close registration
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        bgcolor: "linear-gradient(135deg, #2575fc, #6a11cb)",
                        "&:hover": {
                          bgcolor: "linear-gradient(135deg, #1e62d5, #551a8b)",
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        },
                        transition:
                          "background 0.3s, transform 0.3s, box-shadow 0.3s",
                        borderRadius: 4,
                        textTransform: "none",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={handleClose}
                    >
                      open registration
                    </Button>
                  )}

                  {/* Learn More Button */}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: 4,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderColor: "#2575fc",
                      "&:hover": {
                        backgroundColor: "#2575fc",
                        borderColor: "#1e62d5",
                        color: "#fff",
                      },
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrganiserEventList;
