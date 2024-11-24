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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//components
import EnrollmentForm from "./EventEnrollmentForm.jsx";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [evtName, setEvtName] = useState("");

  const [openEnrollmentForm, setOpenEnrollmentForm] = useState(false);

  const handleEnrollmentOpen = () => {
    setOpenEnrollmentForm(true);
  };
  const handleEnrollmentClose = () => setOpenEnrollmentForm(false);

  const handleEnrollmentSubmit = (data) => {
    console.log("Enrollment Data Submitted:", data);
    setOpenEnrollmentForm(false);
    alert("You have successfully enrolled!");
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
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: 350,
                  margin: "0 auto",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
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
                  }}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.9rem",
                      color: "#666",
                      marginBottom: "12px",
                    }}
                  >
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", color: "#999" }}
                  >
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, marginTop: "16px" }}>
                    {/* Enroll Now Button */}
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleEnrollmentOpen();
                        setEvtName(event.title);
                      }}
                      sx={{
                        flex: 1,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Enroll Now
                    </Button>

                    {/* Learn More Button */}
                    <Button
                      variant="outlined"
                      sx={{
                        flex: 1,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "#fff",
                        },
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
        <EnrollmentForm
          open={openEnrollmentForm}
          handleClose={handleEnrollmentClose}
          handleSubmit={handleEnrollmentSubmit}
          evtName={evtName}
        />
      </Box>
    </Box>
  );
};

export default EventList;
