import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { API } from "../../source/api";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let response = await API.getPendingRequest();
        const result = response.data.data;
        setRequests(result);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        setRequests([]); // Fallback to empty array in case of error
      }
    };
    fetchRequests();
  }, [id]);

  const handleAccept = async (id) => {
    console.log("Accepted Event ID:", id);
    try {
      let response = await API.acceptRequest({ id });
      console.log("this is response form the accept api ", response.data);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (id) => {
    console.log("Declined Event ID:", id);
    try {
      await API.declineRequest(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#333",
        }}
      >
        Event Management Pending Request
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              STUDENT NAME
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              EVENT ENROLLED IN
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              EMAIL
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              STATUS
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              RECEIPT IMAGE
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No pending requests.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  {request.createdBy?.fullname || "No Name"}
                </TableCell>
                <TableCell>{request.EventName || "No Event"}</TableCell>
                <TableCell>{request.email || "No Email"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      backgroundColor: "#ffc107",
                      color: "#000",
                      cursor: "default",
                      fontWeight: "bold",
                    }}
                  >
                    {request.status || "No Status"}
                  </Button>
                </TableCell>
                <TableCell>
                  {request.ReciptImage ? (
                    <Button
                      variant="text"
                      sx={{
                        textDecoration: "underline",
                        color: "#1976d2",
                      }}
                      onClick={() => window.open(request.ReciptImage, "_blank")}
                    >
                      View Receipt
                    </Button>
                  ) : (
                    "No Receipt"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 2 }}
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDecline(request._id)}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingRequests;
