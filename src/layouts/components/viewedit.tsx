import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Grid, 
  TextField,
  CircularProgress
} from '@mui/material';
import { doc, updateDoc, deleteDoc, getDoc,Timestamp } from 'firebase/firestore';
import { db } from "./firebase";

interface UserData {
  id: string;
  admissionDate: string;
  bloodGroup: string;
  rollNo: string;
  section: string;
  class: string;
  name: string;
  number: string;
  guardiansName: string;
  guardiansNumber: string;
  dob: string;
  email: string;
  [key: string]: string | Timestamp;
}

interface FormErrors {
  admissionDate?: string;
  bloodGroup?: string;
  rollNo?: string;
  section?: string;
  class?: string;
  name?: string;
  number?: string;
  guardiansName?: string;
  guardiansNumber?: string;
  dob?: string;
  email?: string;
}

export function ViewUserDialog({ open, onClose, user }: { open: boolean, onClose: () => void, user: { id: string } }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (open && user.id) {
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData({ id: userSnap.id, ...userSnap.data() } as UserData);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [open, user.id]);

  const formatValue = (key: string, value: any) => {
    if (value === null || value === undefined) return 'N/A';
    if (key === 'dob' || key === 'admissionDate') {
      return new Date(value).toLocaleDateString();
    }
    return value.toString();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <Grid container justifyContent="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : userData ? (
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {Object.entries(userData).map(([key, value]) => (
              key !== 'id' && (
                <Grid item xs={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formatValue(key, value)}
                    InputProps={{ readOnly: true }}
                    variant="standard"
                  />
                </Grid>
              )
            ))}
          </Grid>
        ) : (
          <Grid container justifyContent="center" sx={{ py: 4 }}>
            <p>User not found</p>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export function EditUserDialog({ open, onClose, user, onUpdate }: { open: boolean, onClose: () => void, user: { id: string }, onUpdate: () => void }) {
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (open && user.id) {
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setEditedUser({ id: userSnap.id, ...userSnap.data() } as UserData);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [open, user.id]);

  const validateForm = (): boolean => {
    if (!editedUser) return false;

    const newErrors: FormErrors = {};

    // Validation logic (same as previous implementation)
    if (!editedUser.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (editedUser.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // (Rest of validation logic remains the same as in previous implementation)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;

    const { name, value } = e.target;
    setEditedUser(prev => prev ? ({ ...prev, [name]: value }) : null);

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    if (!editedUser) return;

    if (validateForm()) {
      try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, editedUser);
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        {loading ? (
          <Grid container justifyContent="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : editedUser ? (
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {Object.keys(editedUser).map((key) => (
              key !== 'id' && (
                <Grid item xs={6} key={key}>
                  <TextField
                    fullWidth
                    name={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={editedUser[key as keyof UserData] || ''}
                    onChange={handleChange}
                    error={!!errors[key as keyof FormErrors]}
                    helperText={errors[key as keyof FormErrors]}
                    type={
                      key === 'admissionDate' || key === 'dob' ? 'date' : 
                      key === 'number' || key === 'guardiansNumber' ? 'tel' : 
                      key === 'email' ? 'email' : 'text'
                    }
                    InputLabelProps={
                      (key === 'admissionDate' || key === 'dob') ? 
                      { shrink: true } : undefined
                    }
                  />
                </Grid>
              )
            ))}
          </Grid>
        ) : (
          <Grid container justifyContent="center" sx={{ py: 4 }}>
            <p>User not found</p>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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