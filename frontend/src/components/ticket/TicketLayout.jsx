import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import html2pdf from "html2pdf.js"; // Import the html2pdf.js library

const Ticket = ({ result }) => {
  const handleDownload = () => {
    const element = document.getElementById("print-ticket");

    // Options for html2pdf
    const options = {
      margin: 10,
      filename: "ticket.pdf",
      html2canvas: { scale: 4 }, // Increase scale for better quality
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      {/* Ticket Wrapper */}
      <div id="print-ticket">
        <Paper
          elevation={8}
          sx={{
            width: "400px",
            margin: "20px auto",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#f5f5f5",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Participant Section */}
          <Box
            sx={{
              background: "#3f51b5",
              padding: "20px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                letterSpacing: "1px",
              }}
            >
              Eventify
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mt: 2,
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              {result.EventName}
            </Typography>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Participant Name:
              </Typography>
              <Typography sx={{ marginBottom: "8px" }}>
                {result.createdBy.fullname}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Venue:
              </Typography>
              <Typography sx={{ marginBottom: "8px" }}>
                St. Aloysius institute of Technology, Jabalpur
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Time:
              </Typography>
              <Typography sx={{ marginBottom: "8px" }}>
                10:00 AM - 4:00 PM
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Ticket Price:
              </Typography>
              <Typography sx={{ marginBottom: "8px" }}>50 INR</Typography>
            </Box>
          </Box>

          {/* Tearable Section */}
          <Box
            sx={{
              background: "lightgrey",
              padding: "10px 20px",
              borderTop: "2px dashed #ccc",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Event Name:
                  </Typography>
                  <Typography>{result.EventName}</Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Date:
                  </Typography>
                  <Typography>12th December 2024</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Ticket No.:
                  </Typography>
                  <Typography>{result.Ticket_No}</Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Participant:
                  </Typography>
                  <Typography> {result.createdBy.fullname}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>

      {/* Download Button */}
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{
            background: "#3f51b5",
            "&:hover": {
              background: "#303f9f",
            },
            textTransform: "none",
          }}
        >
          Download Ticket
        </Button>
      </Box>
    </div>
  );
};

export default Ticket;
