import React from "react";
import { Box } from "@mui/material";
import EventList from "../events/EventList.jsx";

const StudentHomePage = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }, // Drawer width adjustment
        }}
      >
        <EventList />
      </Box>
    </Box>
  );
};

export default StudentHomePage;
