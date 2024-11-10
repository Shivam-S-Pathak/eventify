// OrganizerHomePage.jsx

import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const OrganizerHomePage = ({ setIsAuthenticated2, isAuthenticated2 }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { account, setAccount } = useContext(DataContext);
  const [events, setEvents] = useState([
    { title: "Science Exhibition", participants: 150 },
    { title: "Annual Day", participants: 120 },
    // ... other events
  ]);

  const handleAddEvent = () => setOpen(true);
  const handleLogout = () => {
    sessionStorage.removeItem("OrganiserUser");
    setIsAuthenticated2(false);
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated2) {
      const user = sessionStorage.getItem("OrganiserUser");

      if (user) {
        const parsedUser = JSON.parse(user);

        if (parsedUser.user?.fullname && parsedUser.user?.email) {
          setAccount({
            username: parsedUser.user.fullname,
            email: parsedUser.user.email,
          });
        }
      }
    }
  }, [isAuthenticated2, setAccount]);
  return (
    <>
      {/* Navbar with Logout Button */}
      <AppBar position="static" sx={{ bgcolor: "#7B2D26" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Organizer Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
        <Typography sx={{ color: "black" }}>
          Hello {account.username}
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          Manage Events
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Add New Event
        </Button>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.participants} participants
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Event Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Event Title" fullWidth />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              margin="dense"
              label="Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button color="primary">Add Event</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default OrganizerHomePage;
