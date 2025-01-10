import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination} from "@mui/material";
import SnackbarComponent from "../SnackBarComponent";
import { useContext } from "react";
import SessionContext from '../../context/SessionContext';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const { setErrorHandler } = useContext(SessionContext);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost/server/api/users/users");
      if (!response.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Failed to fetch users",
          alertColor: "error",
        });
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/server/api/users/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Failed to delete user",
          alertColor: "error",
        });
      } else {
        setUsers(users.filter((user) => user.id !== id));
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "User deleted successfully",
          alertColor: "success",
        });
      }
    } catch (err) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: err.message,
        alertColor: "error",
      });
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost/server/api/users/users/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Failed to update user",
          alertColor: "error",
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Successfully updated data",
          alertColor: "success",
        });
      }
      console.log("fetchinu");
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? editUser : user
      );
      setUsers(updatedUsers);
      setEditUser(null);
    } catch (err) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: err.message,
        alertColor: "error",
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  if (loading) {
    return <CircularProgress />;
  }

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Post Code</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.postCode}</TableCell>
                <TableCell align="center">{user.admin ? "Yes" : "No"}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      color: "#f9fafb",
                      bgcolor: "#111827",
                      alignSelf: "flex-start",
                      mr: "1rem",
                    }}
                    onClick={() => handleEditClick(user)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      color: "#f9fafb",
                      bgcolor: "#991B1B",
                      alignSelf: "flex-start",
                    }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <SnackbarComponent />

      {editUser && (
        <Dialog open={true} onClose={() => setEditUser(null)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="First Name"
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Phone"
              value={editUser.phoneNumber}
              onChange={(e) =>
                setEditUser({ ...editUser, phoneNumber: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Address"
              value={editUser.address}
              onChange={(e) =>
                setEditUser({ ...editUser, address: e.target.value })
              }
              margin="dense"
            />
            <TextField
              fullWidth
              label="Post Code"
              value={editUser.postCode}
              onChange={(e) =>
                setEditUser({ ...editUser, postCode: e.target.value })
              }
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained"
              sx={{
                color: "#f9fafb",
                bgcolor: "#991B1B",
                alignSelf: "flex-start",
              }}
              onClick={() => setEditUser(null)}>Cancel
            </Button>
            <Button 
              variant="contained"
              sx={{
                color: "#f9fafb",
                bgcolor: "#111827",
                alignSelf: "flex-start",
              }} onClick={handleUpdate}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}