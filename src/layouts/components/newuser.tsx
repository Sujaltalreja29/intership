import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

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

export function NewUserForm({ open, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    admissionDate: '',
    bloodGroup: '',
    rollNo: '',
    section: '',
    class: '',
    name: '',
    number: '',
    guardiansName: '',
    guardiansNumber: '',
    dob: '',
    email: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone number validation (simple 10-digit check)
    const phoneRegex = /^\d{10}$/;
    if (!formData.number.trim()) {
      newErrors.number = 'Contact number is required';
    } else if (!phoneRegex.test(formData.number.replace(/\D/g, ''))) {
      newErrors.number = 'Invalid contact number (must be 10 digits)';
    }

    // Guardian's number validation
    if (!formData.guardiansNumber.trim()) {
      newErrors.guardiansNumber = 'Guardian\'s contact number is required';
    } else if (!phoneRegex.test(formData.guardiansNumber.replace(/\D/g, ''))) {
      newErrors.guardiansNumber = 'Invalid guardian\'s contact number (must be 10 digits)';
    }

    // Admission date validation
    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Admission date is required';
    }

    // Date of birth validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const currentDate = new Date();
      const minAge = new Date(currentDate.getFullYear() - 150, currentDate.getMonth(), currentDate.getDate());
      const maxAge = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());

      if (dobDate > currentDate) {
        newErrors.dob = 'Date of birth cannot be in the future';
      } else if (dobDate < minAge) {
        newErrors.dob = 'Invalid date of birth';
      } else if (dobDate > maxAge) {
        newErrors.dob = 'Minimum age is 5 years';
      }
    }

    // Blood group validation (optional, but can be added)
    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (formData.bloodGroup && !validBloodGroups.includes(formData.bloodGroup.toUpperCase())) {
      newErrors.bloodGroup = 'Invalid blood group';
    }

    // Roll number validation (optional format check)
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }

    // Class and section validations
    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
    }

    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>New User Registration</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Admission Date"
              name="admissionDate"
              type="date"
              value={formData.admissionDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.admissionDate}
              helperText={errors.admissionDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              error={!!errors.bloodGroup}
              helperText={errors.bloodGroup}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Roll No"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              error={!!errors.rollNo}
              helperText={errors.rollNo}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              error={!!errors.section}
              helperText={errors.section}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              error={!!errors.class}
              helperText={errors.class}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="number"
              type="tel"
              value={formData.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Guardian's Name"
              name="guardiansName"
              value={formData.guardiansName}
              onChange={handleChange}
              error={!!errors.guardiansName}
              helperText={errors.guardiansName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Guardian's Number"
              name="guardiansNumber"
              type="tel"
              value={formData.guardiansNumber}
              onChange={handleChange}
              error={!!errors.guardiansNumber}
              helperText={errors.guardiansNumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}