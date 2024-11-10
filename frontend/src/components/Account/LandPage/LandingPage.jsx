import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Grid from "@mui/material/Grid2";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EastIcon from "@mui/icons-material/East";

const LandingPage = () => {
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
          <Typography variant="h6" paragraph color="#F0F7EE" fontWeight="bolder">
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
          >
            Get Started <EastIcon sx={{ml:1}} />
          </Button>
        </Container>
      </Box>

     
      {/* Featured Events Section */}
      <Box sx={{ py: 8, bgcolor: "#fff" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Events
          </Typography>
          <Grid container spacing={2} sx={{display:"flex" , justifyContent:"center"  , align:"center"}}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <img
                    src={`./public/2nd-banner.jpg`}
                    alt={`Event ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">Event {index + 1}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Join us for an unforgettable experience!
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
            Reach out to our team in case of any query related to
            college event!
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
