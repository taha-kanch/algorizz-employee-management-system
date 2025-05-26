import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from "formik";
import { loginSchema } from '../../schema/auth';
import { login } from './action';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        const session = localStorage.getItem("accessToken");
        const userType = localStorage.getItem("role");
        if (session) {
            if (userType == "ADMIN") {
                navigate('/admin');

            } else if (userType == "EMPLOYEE") {
                navigate('/employee');
            }
        }
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div style={{ maxWidth: 400, margin: "50px auto" }}>
                <h2>Login</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        login(values, setSubmitting, navigate, dispatch);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <FormikForm onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    fullWidth
                                    id="loginEmail"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Email"
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <TextField
                                    fullWidth
                                    id="loginPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Password"
                                    error={Boolean(touched.password && errors.password)}
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
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    disabled={isSubmitting}
                                >
                                    {!isSubmitting ? "Proceed" : "Loading..."}
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Login
