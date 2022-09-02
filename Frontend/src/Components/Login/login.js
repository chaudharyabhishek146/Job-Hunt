import React, { useState, useEffect, useContext } from 'react'
import '../Login/login.css'
import { useFormik } from "formik";
import apiConfig from "../config";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup"
import axios from 'axios'
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AppContext from '../context/appcontext';
import LogHoc from '../LogHoc';

function Login() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppContext);
    const [log, setlog] = useState(null)
    const [user, setUser] = useState(null);

    


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

    const google =  () => {
        localStorage.setItem("verification",true)
        window.open("http://localhost:3001/auth/google", "_self")
    }





    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            fetch(`${apiConfig.authapi}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email: values.email, password: values.password })
            }).then(res => res.json()).then(async (data) => {
                if (data.status === 200) {
                    // console.log("Logged in")
                    // console.log(data)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("email", values.email)
                    localStorage.setItem("name", data.name)
                    localStorage.setItem("type", "local")
                    await fetch(`${apiConfig.authapi}/authenticate`, {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': localStorage.getItem('token')
                        }
                    }).then(data => data.json()).then(data => {
                        if (data.status === 200) {
                            // console.log("verificat true")
                            localStorage.setItem("verification", true)
                        }
                        else {
                            localStorage.setItem("verification", false)
                        }
                    })
                    await dispatch({ type: 'LOGIN' })
                    navigate("/")
                }


            }).catch(err => {
                handleOpen();
            });

        },
        validationSchema: values => yup.object().shape({
            email: yup.string().required("Email is required"),
            password: yup.string().min(8, "Password is too short").required("Password is required")

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
                                            <h4 class="mb-4">Login</h4>
                                        </div>
                                        <form class="login-form" onSubmit={formik.handleSubmit}>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group position-relative">
                                                        <label>Your Email <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="email"
                                                            type="email"
                                                            className="form-control mt-1"
                                                            placeholder="Enter email"
                                                            onChange={formik.handleChange} value={formik.values.email} />
                                                        {formik.errors.email && formik.touched.email ? <span style={{ color: "red" }}>{formik.errors.email}</span> : null}
                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <div class="form-group position-relative">
                                                        <label>Password <span class="text-danger">*</span></label>
                                                        <input onBlur={formik.handleBlur}
                                                            id="password"
                                                            type="password"
                                                            className="form-control mt-1"
                                                            placeholder="Enter password"
                                                            onChange={formik.handleChange} value={formik.values.password} />
                                                        {formik.errors.password && formik.touched.password ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}
                                                    </div>
                                                </div>

                                                <div class="col-lg-12">
                                                    <p class="float-end forgot-pass"><a onClick={(e) => navigate("/Forgot")} class="text-dark font-weight-bold ">Forgot password ?</a></p>

                                                </div>
                                                <div class="col-lg-12 mb-0">
                                                    <button type='submit' class="btn btn-primary w-100">Sign in</button>
                                                </div>
                                                <div class="col-lg-12 mt-4 text-center">
                                                    <h6>Or Login With</h6>
                                                    <ul class="list-unstyled social-icon mb-0 mt-3">
                                                        <button type="button" className='btn btn-dark' onClick={google}> Login with Google</button>
                                                        <li class="list-inline-item"><a href="" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                                                        <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-google-plus" title="Google"></i></a></li>
                                                        <li class="list-inline-item"><a href="#" class="rounded"><i class="mdi mdi-github-circle" title="Github"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <p class="mb-0 mt-3"><small class="text-dark mr-2">Don't have an account ?</small> <a onClick={(e) => navigate("/signin")} class="text-dark font-weight-bold">Sign Up</a></p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div> {/*  <--end col--> */}
                            </div>{/*<!--end row-->*/}
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Incorrect email or password !
                                </Alert>
                            </Snackbar>

                        </div> {/*<!--end container-->*/}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default LogHoc(Login)

