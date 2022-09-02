import React from 'react'
import { Formik, useFormik } from 'formik'
import apiConfig from '../config'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LogHoc from '../LogHoc';

function Otpverification() {
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
            otp: ''
            
        },
        onSubmit: values => {
            fetch(`${apiConfig.authapi}/otpverify`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email: localStorage.getItem("femail"), otp: values.otp })
            }).then(res => res.json()).then(data => {
                // console.log(data)
                if (data.status === 200) {
                    //console.log("Password reset successfully")
                    navigate("/forgotchangepassword")
                }
                
                else if (data.status === '400') {
                    // console.log(data.message)
                    handleOpen();
                    

                    
                }
                

            })
        },
        validationSchema: values => yup.object().shape({
            otp: yup.string().required("OTP Field is required"),
           
        })
    })
  return (
    <div>
        <section class="Login" >
                

                <div class="home-center">
                    <div class="home-desc-center">
                        <div class="container" >
                            <div class="row justify-content-center">

                                <div class="col-lg-4 col-md-6">
                                    <div class="login-page bg-white shadow rounded p-4">
                                        <div class="text-center">
                                            <h4 class="mb-4">Otp Verification</h4> 
                                            <h6>Otp sent on {localStorage.getItem("femail")}</h6> 
                                        </div>
                                        <form class="login-form" onSubmit={formik.handleSubmit}>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group position-relative">
                                                        <label>Otp <span class="text-danger">*</span></label>
                                                        <input
                                                            id="otp"
                                                            type="string"
                                                            className="form-control mt-1"
                                                            placeholder="Otp"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange} value={formik.values.otp}
                                                        />
                                                        {formik.errors.otp && formik.touched.otp ? <span>{formik.errors.otp}</span> : null}

                                                        </div>
                                                </div>
                                                <div class="col-lg-12 mb-0">
                                                    <button type='submit' class="btn btn-primary w-100">Submit</button>
                                                </div>
                                               
                                                
                                            </div>
                                        </form>
                                    </div>
                                </div> {/*  <--end col--> */}
                            </div>{/*<!--end row-->*/}
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                        Incorrect Otp !
                                    </Alert>
                            </Snackbar>
                        </div> {/*<!--end container-->*/}
                    </div>
                </div>
            </section>

    </div>
  )
}

export default LogHoc(Otpverification)