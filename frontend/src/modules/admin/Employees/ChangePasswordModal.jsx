import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField,
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Formik, Form } from 'formik';
import { changePasswordApiCall } from '../action';
import { changePasswordSchema } from '../../../schema/admin';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePasswordModal = ({ open, onClose, employee, refetch = () => { } }) => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Change Password</DialogTitle>
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmNewPassword: "",
                }}
                validationSchema={changePasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    delete values.confirmNewPassword;
                    changePasswordApiCall(values, employee.id, setSubmitting, refetch);
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        label="new Password"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        error={touched.newPassword && Boolean(errors.newPassword)}
                                        helperText={touched.newPassword && errors.newPassword}
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmNewPassword"
                                        label="Confirm Password"
                                        value={values.confirmNewPassword}
                                        onChange={handleChange}
                                        error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                                        helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">Change Password</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default ChangePasswordModal;
