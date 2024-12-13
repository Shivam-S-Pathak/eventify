import React, { useEffect, useState } from "react";
import { API } from "../../source/api.js";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const OrganiserEventList = () => {
  const [events, setEvents] = useState([]);

  const handleClose = async (id, currentStatus) => {
    try {
      // Optimistic update
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, isclosed: !currentStatus } : event
        )
      );

      // Update the status in the database
      await API.closeregistration({ id, isclosed: !currentStatus });
    } catch (error) {
      console.error("Error updating registration status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getData();
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        p: 5,
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
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
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  bgcolor: event.isclosed ? "grey" : "transparent",
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
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    sx={{ color: "#666", lineHeight: 1.5 }}
                  >
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        bgcolor: event.isclosed ? "grey" : "#2575fc",
                        "&:hover": {
                          bgcolor: event.isclosed ? "darkgrey" : "#1e62d5",
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
                      }}
                      onClick={() => handleClose(event._id, event.isclosed)}
                    >
                      {event.isclosed ? "Open Registration" : "Close Registration"}
                    </Button>
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
    </Box>
  );
};

export default OrganiserEventList;
