import React, { useState } from "react";

import { useFormik } from "formik";
import apiConfig from '../config'
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LogHoc from "../LogHoc";

function Signin() {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: ''
        },
        onSubmit: values => {
            //   console.log(values)
            fetch(`${apiConfig.authapi}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json()).then(data => {
                if (data.status === 200) {
                    navigate("/login")
                }
                else {
                    handleOpen();
                }

            })


        },
        validationSchema: values => yup.object().shape({
            firstname: yup.string().required("First Name is required"),
            lastname: yup.string().required("Last Name is required"),
            email: yup.string().required("Email is required"),
            password: yup.string().min(8, "Password is too short").required("Password is required"),
            confirmpassword: yup.string().required("Confirm Password is required")

        })
    })//formik
    return (
        <div>
            <section class="Login">
                <div class="home-center">
                    <div class="home-desc-center">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-md-6">
                                    <div class="login_page bg-white shadow rounded p-4">
                                        <div class="text-center">
                                            <h4 class="mb-4">Signup</h4>
                                        </div>
                                        <form class="login-form" onSubmit={formik.handleSubmit}>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group position-relative">
                                                        <label>First name <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="firstname"
                                                            type="text"
                                                            className="form-control mt-1"
                                                            placeholder="First Name"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.firstname} />
                                                        {formik.errors.firstname && formik.touched.firstname ? <span className={{ color: "red" }}>{formik.errors.firstname}</span> : null}

                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group position-relative">
                                                        <label>Last name <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="lastname"
                                                            type="text"
                                                            className="form-control mt-1"
                                                            placeholder="Last Name"
                                                            onChange={formik.handleChange} value={formik.values.lastname}
                                                        />
                                                        {formik.errors.lastname && formik.touched.lastname ? <span className={{ color: "red" }}>{formik.errors.lastname}</span> : null}

                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group position-relative">
                                                        <label>Your Email <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="email"
                                                            type="email"
                                                            className="form-control mt-1"
                                                            placeholder="Email Address"
                                                            onChange={formik.handleChange} value={formik.values.email} />
                                                        {formik.errors.email && formik.touched.email ? <span className={{ color: "red" }}>{formik.errors.email}</span> : null}
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group position-relative">
                                                        <label>Password <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="password"
                                                            type="password"
                                                            className="form-control mt-1"
                                                            placeholder="Password"
                                                            onChange={formik.handleChange} value={formik.values.password} />
                                                        {formik.errors.password && formik.touched.password ? <span className={{ color: "red" }}>{formik.errors.password}</span> : null}

                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group position-relative">
                                                        <label>Confirm Password <span class="text-danger">*</span></label>
                                                        <input id="confirmpassword"
                                                            type="password"
                                                            className="form-control mt-1"
                                                            placeholder="Confirm password"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange} value={formik.values.confirmpassword} />
                                                        {formik.errors.confirmpassword && formik.touched.confirmpassword ? <span>{formik.errors.confirmpassword}</span> : null}

                                                    </div>
                                                    {formik.values.password !== formik.values.confirmpassword ? <span>Passwords doesn't match</span> : null}
                                                </div>

                                                <div class="col-md-12">
                                                    <button type="submit" class="btn btn-primary w-100">Register</button>
                                                </div>
                                                <div class="col-lg-12 mt-4 text-center">
                                                    {/* <h6>Or Signup With</h6> */}
                                                    {/* <ul class="list-unstyled social-icon mb-0 mt-3">
                                                    <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                                                    <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-google-plus" title="Google"></i></a></li>
                                                    <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-github-circle" title="Github"></i></a></li>
                                                </ul> */}
                                                </div>
                                                <div class="mx-auto text-center">
                                                    <p class="mb-0 mt-3"><small class="text-dark mr-2 text-center">Already have an account ?</small> <a onClick={(e) => navigate("/login")} class="text-dark font-weight-bold">Sign in</a></p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Email Already Exists !
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LogHoc(Signin)

