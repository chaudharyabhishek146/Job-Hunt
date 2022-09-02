
import React from 'react'
import { Formik, useFormik } from 'formik'
import apiConfig from '../config'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import SvgIcon from '@mui/material/SvgIcon';
import * as yup from "yup";
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
export default function Forgot() {
    const navigate = useNavigate()


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

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            fetch(`${apiConfig.authapi}/forgotpassword`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email: values.email })
            }).then(res => res.json()).then(data => {
                if (data.status === 200) {
                    // console.log("OTP sent")
                    localStorage.setItem("femail", values.email);
                    navigate(`/otpverfiy`)
                }
                else{
                    handleOpen();
                }
                
            })

        },
        validationSchema: values => yup.object().shape({
           email: yup.string().required("Email Field is required"),
           
        })
    })
    return (
        <div>
            <div class="back-to-home rounded d-none d-sm-block">
            <a onClick={()=>navigate('/')} ><HomeIcon color="secondary" /></a>
               
            </div>

                <section class="Login" >
                

                    <div class="home-center">
                        <div class="home-desc-center">
                            <div class="container" >
                                <div class="row justify-content-center">

                                    <div class="col-lg-4 col-md-6">
                                        <div class="login-page bg-white shadow rounded p-4">
                                            <div class="text-center">
                                                <h4 class="mb-4">Forget Password</h4>  
                                            </div>
                                            <form class="login-form" onSubmit={formik.handleSubmit}>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group position-relative">
                                                            <label>Your Email <span class="text-danger">*</span></label>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                className="form-control mt-1"
                                                                placeholder="Enter email"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.email}
                                                            />
                                                            {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : null}

                                                            </div>
                                                    </div>
                                                    <div class="col-lg-12 mb-0">
                                                        <button type='submit' class="btn btn-primary w-100">Submit</button>
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
                                        Incorrect email !
                                    </Alert>
                                </Snackbar>

                            </div> {/*<!--end container-->*/}
                        </div>
                    </div>
                </section>
        </div>
    )
}


