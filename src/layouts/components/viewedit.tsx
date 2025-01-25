import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Grid, 
  TextField 
} from '@mui/material';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "./firebase";

// View User Dialog
export function ViewUserDialog({ open, onClose, user }: any) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          {Object.entries(user).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value || 'N/A'}
                InputProps={{ readOnly: true }}
                variant="standard"
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Edit User Dialog
export function EditUserDialog({ open, onClose, user, onUpdate }: any) {
  const [editedUser, setEditedUser] = useState({...user});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, editedUser);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          {Object.keys(user).map((key) => (
            key !== 'id' && (
              <Grid item xs={6} key={key}>
                <TextField
                  fullWidth
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={editedUser[key] || ''}
                  onChange={handleChange}
                />
              </Grid>
            )
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Delete Confirmation Dialog
export function DeleteUserDialog({ open, onClose, user, onDelete }: any) {
  const handleDelete = async () => {
    try {
      const userRef = doc(db, "users", user.id);
      await deleteDoc(userRef);
      onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the user {user.name}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}