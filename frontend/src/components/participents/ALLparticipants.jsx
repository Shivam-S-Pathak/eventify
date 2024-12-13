import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { API } from "../../source/api.js"; // Replace with your actual API utility path

const EnrolledStudents = () => {
  const [enrollments, setEnrollments] = useState([]);

  //   useEffect(() => {
  //     const fetchEnrollments = async () => {
  //       try {
  //         const response = await API.getEnrollments();
  //         setEnrollments(response.data);
  //       } catch (error) {
  //         console.error("Error fetching enrollments:", error);
  //       }
  //     };

  //     fetchEnrollments();
  //   }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Enrolled Students
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Event Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Ticket No</strong>
              </TableCell>
              <TableCell>
                <strong>Receipt</strong>
              </TableCell>
              <TableCell>
                <strong>Created By</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.map((enrollment, index) => (
              <TableRow key={index}>
                <TableCell>{enrollment.EventName}</TableCell>
                <TableCell>{enrollment.email}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        enrollment.status === "confirmed"
                          ? "green"
                          : enrollment.status === "pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {enrollment.status}
                  </Typography>
                </TableCell>
                <TableCell>{enrollment.Ticket_No}</TableCell>
                <TableCell>
                  <Avatar
                    src={enrollment.ReciptImage}
                    alt="Receipt"
                    variant="square"
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{enrollment.createdBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EnrolledStudents;
