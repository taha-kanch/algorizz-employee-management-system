import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Formik, Form } from 'formik';
import { addEmployeeApiCall, updateEmployeeApiCall } from '../action';
import { employeeSchema } from '../../../schema/admin';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EmployeeFormModal = ({ open, onClose, employee, refetch = () => { } }) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{employee?.id ? "Edit" : "Add"} Employee</DialogTitle>
      <Formik
        initialValues={{
          ...employee,
          firstName: employee?.firstName || "",
          lastName: employee?.lastName || "",
          email: employee?.email || "",
          password: employee?.password || "",
          phoneNumber: employee?.phoneNumber || "",
          address: employee?.address || "",
          salary: employee?.salary || "",
          dateOfBirth: employee?.dateOfBirth?.substring(0, 10) || "",
          joiningDate: employee?.joiningDate?.substring(0, 10) || "",
        }}
        validationSchema={employeeSchema}
        onSubmit={(values, { setSubmitting }) => {
          values.role = "EMPLOYEE";
          if (employee?.id) {
            updateEmployeeApiCall(values, values.id, setSubmitting, refetch);
          } else {
            addEmployeeApiCall(values, setSubmitting, refetch);
          }
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <DialogContent dividers>

              <Grid container spacing={2}>
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email"],
                  ["phoneNumber", "Phone Number"],
                  ["dateOfBirth", "Date of Birth", "date"],
                  ["address", "Address"],
                  ["designation", "Designation"],
                  ["salary", "Salary", "number"],
                  ["joiningDate", "Joining Date", "date"],
                ].map(([name, label, type = "text"], index) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <TextField
                      fullWidth
                      margin="normal"
                      type={type}
                      name={name}
                      label={label}
                      value={values[name]}
                      onChange={handleChange}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      InputLabelProps={type === "date" || type === "datetime-local" ? { shrink: true } : undefined}
                    />
                  </Grid>
                ))}
                {!employee?.id && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{employee?.id ? "Update" : "Add"}</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EmployeeFormModal;
