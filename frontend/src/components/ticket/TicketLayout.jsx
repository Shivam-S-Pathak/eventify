import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js";

const Ticket = ({ result }) => {
  const handleDownload = () => {
    const element = document.getElementById("print-ticket");

    const options = {
      margin: 10,
      filename: "ticket.pdf",
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <Box sx={{ background: "#f9fafc", minHeight: "100vh", padding: "20px" }}>
      {/* Ticket Content */}
      <div id="print-ticket">
        <Paper
          elevation={3}
          sx={{
            maxWidth: "450px",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#ffffff",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: "#0066cc",
              padding: "20px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Eventify
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                mt: 1,
                textDecoration: "underline",
              }}
            >
              {result.EventName}
            </Typography>
          </Box>

          {/* Participant and Organizer Sections */}
          <Box sx={{ padding: "20px", color: "#333" }}>
            {/* Participant's Part */}
            <Box
              sx={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
              >
                Participant Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {result.createdBy.fullname}
              </Typography>
              <Typography>
                <strong>Venue:</strong> St. Aloysius Institute of Technology,
                Jabalpur
              </Typography>
              <Typography>
                <strong>Date:</strong> 12th December 2024
              </Typography>
              <Typography>
                <strong>Ticket No.:</strong> {result.Ticket_No}
              </Typography>
              <Typography>
                <strong>Time:</strong> 10:00 AM - 4:00 PM
              </Typography>
              <Typography>
                <strong>Ticket Price:</strong> ₹50
              </Typography>
             
            </Box>
           
<hr />
            <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>
              Organizer's Section (Tear Here)
            </Typography>
            
            {/* Organizer's Part (Tearable Section) */}
            <Box
              sx={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                marginBottom: "15px",
                position: "relative",
                paddingBottom: "20px",
              }}
            >
               
            
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1  , textAlign:"center"}}
              >
                Details 
              </Typography>
              <Typography>
                <strong>Event Name:</strong> {result.EventName}
              </Typography>
              <Typography>
                <strong>Date:</strong> 12th December 2024
              </Typography>
              <Typography>
                <strong>Ticket No.:</strong> {result.Ticket_No}
              </Typography>
              <Typography>
                <strong>Participant:</strong> {result.createdBy.fullname}
              </Typography>

              {/* Tear line to separate the organizer's part */}
             
            </Box>
          </Box>
        </Paper>
      </div>

      {/* Download Button */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleDownload}
          sx={{
            background: "#0066cc",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "6px",
            textTransform: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              background: "#005bb5",
            },
          }}
        >
          Download Ticket
        </Button>
      </Box>
    </Box>
  );
};

export default Ticket;
