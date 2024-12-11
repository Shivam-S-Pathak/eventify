import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

const Ticket = () => {
  const ticketRef = useRef();

  const handleDownload = () => {
    const options = {
      margin: 0.5,
      filename: "SaitHackathon2024_Ticket.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf()
      .from(ticketRef.current)
      .set(options)
      .save();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
       
        maxWidth: "800px",
        margin: "auto",
        position: "relative",
      }}
    >
      {/* Ticket Content wrapped with ref */}
      <Box
        ref={ticketRef}
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            borderRadius: 2,
            maxWidth: "800px",
            margin: "auto",
            position: "relative",
            backgroundImage: "linear-gradient(45deg, #FF4081, #00BCD4)", 
            backgroundSize: "cover",
            color: "#FFF",
        }}
      >
        {/* Tearable Section */}
        <Box
          sx={{
            width: "120px",
            backgroundColor: "#000",
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            textAlign: "center",
            borderRight: "2px dashed #FFF",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            Shivam Pathak
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Ticket Code: 2024048
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#FFF",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            padding: 3,
            position: "relative",
          }}
        >
          {/* Event Image */}
          <Box
            sx={{
              backgroundImage: "url('/hacathons.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              marginBottom: 2,
              height: "150px",  // Added height to make sure the image shows well
            }}
          ></Box>

          {/* Event Details */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              mb: 2,
            }}
          >
            Sait Hackathon 2024
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
            Participant: <strong>Shivam Pathak</strong>
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
            Reference Ticket Number: 2024048
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
            Date: August 15, 2024 | Venue: Tech Arena
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: "120px",
            backgroundColor: "#FF4081",
            color: "#FFF",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Gate
          </Typography>
          <Typography variant="h4">A1</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            Seat
          </Typography>
          <Typography variant="h4">04</Typography>
        </Box>
      </Box>

      {/* Download Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
        >
          Download Ticket (PDF)
        </Button>
      </Box>
    </Box>
  );
};

export default Ticket;
