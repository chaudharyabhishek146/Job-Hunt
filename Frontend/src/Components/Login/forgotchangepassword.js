import React, { useState } from 'react'
import '../Login/login.css'
import { useFormik } from "formik";
import apiConfig from "../config";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LogHoc from '../LogHoc';

function ForgotChangepassword() {

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
            newpass: '',
            confirmpass: ''
        },
        onSubmit: values => {
            fetch(`${apiConfig.authapi}/resetpassword`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email: localStorage.getItem("femail"), newpassword: values.newpass, confirmpassword: values.confirmpass })
            }).then(res => res.json()).then(data => {

                if (data.status === 200) {
                    console.log("Password reset successfully")
                    localStorage.clear();
                    navigate("/login")
                }
                else if (data.status === 400) {
                
                    console.log(data.message)
                    handleOpen();
                    


                }


            })
        },
        validationSchema: values => yup.object().shape({
            newpass: yup.string().required("New Password is required"),
            confirmpass: yup.string().required("Confirm Password is required")
        })
    })
    return (
        <div>
            <section class="Login" >

                <div class="home-center">
                    <div class="home-desc-center">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 col-md-6">
                                    <div class="login-page bg-white shadow rounded p-4">
                                        <div class="text-center">
                                            <h4 class="mb-4">Change Password</h4>
                                        </div>
                                        <form class="login-form" onSubmit={formik.handleSubmit}>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group position-relative">
                                                        <label>New Password <span class="text-danger">*</span></label>

                                                        <input
                                                            id="newpass"
                                                            type="password"
                                                            className="form-control mt-1"
                                                            placeholder="New passsword"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange} value={formik.values.newpass}
                                                        />
                                                        {formik.errors.newpass && formik.touched.newpass ? <span>{formik.errors.newpass}</span> : null}

                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <div class="form-group position-relative">
                                                        <label>Confirm New Password <span class="text-danger">*</span></label>
                                                        <input
                                                            id="confirmpass"
                                                            type="password"
                                                            className="form-control mt-1"
                                                            placeholder="Confirm password"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange} value={formik.values.confirmpass}
                                                        />
                                                        {formik.errors.confirmpass && formik.touched.confirmpass ? <span>{formik.errors.confirmpass}</span> : null}


                                                    </div>
                                                </div>
                                                <div class="col-lg-12 mb-0">
                                                    <button type='submit' class="btn btn-primary w-100">Change Passsword</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div> {/*  <--end col--> */}
                            </div>{/*<!--end row-->*/}
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Password does not match !
                                </Alert>
                            </Snackbar>

                        </div> {/*<!--end container-->*/}
                    </div>
                </div>
            </section>
        </div>
    )
}
export default LogHoc(ForgotChangepassword)
