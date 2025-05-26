import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField,
  Grid,
  MenuItem
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addIssuesApiCall, updateIssueApiCall } from '../action';
import { issueSchema } from '../../../schema/admin';

const IssueFormModal = ({ open, onClose, issue, refetch = () => { }, employeeData }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{issue?.id ? "Edit" : "Add"} Issue</DialogTitle>
      <Formik
        initialValues={{
          ...issue,
          title: issue?.title || "",
          description: issue?.description || "",
          priority: issue?.priority || "MEDIUM",
          status: issue?.stauts || "TODO",
          assignedToId: issue?.assignedToId || "",
          dueDate: issue?.dueDate?.substring(0, 10) || "",
        }}
        validationSchema={issueSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (issue?.id) {
            updateIssueApiCall(values, values.id, setSubmitting, refetch);
          } else {
            addIssuesApiCall(values, setSubmitting, refetch);
          }
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    margin="normal"
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    name="priority"
                    label="Priority"
                    margin="normal"
                    value={values.priority}
                    onChange={handleChange}
                    error={touched.priority && Boolean(errors.priority)}
                    helperText={touched.priority && errors.priority}
                  >
                    {["LOW", "MEDIUM", "HIGH", "URGENT"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    name="status"
                    label="Status"
                    margin="normal"
                    value={values.status}
                    onChange={handleChange}
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    {["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <TextField
                  fullWidth
                  select
                  name="assignedToId"
                  label="Assigned To"
                  margin="normal"
                  value={values.assignedToId}
                  onChange={handleChange}
                  error={touched.assignedToId && Boolean(errors.assignedToId)}
                  helperText={touched.assignedToId && errors.assignedToId}
                >
                  {employeeData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.firstName + " " + option.lastName}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="dueDate"
                    label="Due Date"
                    type="date"
                    margin="normal"
                    value={values.dueDate}
                    onChange={handleChange}
                    error={touched.dueDate && Boolean(errors.dueDate)}
                    helperText={touched.dueDate && errors.dueDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    label="Description"
                    margin="normal"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{issue?.id ? "Update" : "Add"}</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default IssueFormModal;
