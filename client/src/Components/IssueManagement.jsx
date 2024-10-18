import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Snackbar,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    email: "",
    role: "",
    feedback_text: "",
    rating: 0,
    issue: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch feedback from backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedbacks");
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Handle new feedback submission
 

  const getChipColor = (rating) => {
    if (rating >= 4) return green[500];
    if (rating >= 2) return red[500];
    return red[700];
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Issue Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Feedback</strong>
              </TableCell>
              <TableCell>
                <strong>Rating</strong>
              </TableCell>
              <TableCell>
                <strong>Issue</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.name}</TableCell>
                <TableCell>{issue.email}</TableCell>
                <TableCell>{issue.role}</TableCell>
                <TableCell>{issue.feedback_text}</TableCell>
                <TableCell>
                  <Chip
                    label={issue.rating}
                    style={{
                      backgroundColor: getChipColor(issue.rating),
                      color: "white",
                    }}
                  />
                </TableCell>
                <TableCell>{issue.issue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default IssueManagement;
