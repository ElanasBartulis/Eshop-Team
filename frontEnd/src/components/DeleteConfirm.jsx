import React from "react";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
} from "@mui/material";

export default function DeleteConfirmation({ 
  open, 
  message, 
  onClose, 
  onConfirm 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogContent
        sx={{
            color: "#19181A",
            p: 0,
        }}>
        <DialogContentText 
            id="delete-dialog-description" 
            sx={{
                color: "#19181A",
                mx: 2,
                mt: 2,
                fontWeight: 'medium',
                lineHeight: 2
            }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions 
        sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2
        }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            color: "#f9fafb",
            bgcolor: "#111827",
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          variant="contained"
          sx={{
            color: "#f9fafb",
            bgcolor: "#991B1B",
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Pavyzdys kaip įsikelia componentas:
// <DeleteConfirmation 
//      open={deleteConfirmation.open}
//      message={`Are you sure you want to delete user ${userName}? This action cannot be undone.`}
//      onClose={handleCancelDelete}
//      onConfirm={handleConfirmDelete}
//   /> 