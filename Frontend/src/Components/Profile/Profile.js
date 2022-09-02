import React from 'react'
import apiConfig from '../config'
import { useFormik } from 'formik'
import * as yup from "yup"
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthHoc from '../AuthHoc';
import '../Profile/profile.css'


const data = [
];
function Media(props) {
    const { loading = false } = props;
    return (
        <Grid container wrap="nowrap">
            {(loading ? Array.from(new Array(4)) : data).map((item, index) => (
                <Box key={index} sx={{ width: 250, marginRight: 1.5, my: 5 }}>
                    {item ? (
                        <img
                            style={{ width: 210, height: 118 }}
                            alt={item.title}
                            src={item.src}
                        />
                    ) : (
                        <Skeleton variant="rectangular" width={250} height={300} />
                    )}

                    {item ? (
                        <Box sx={{ pr: 1 }}>
                            <Typography gutterBottom variant="body2">
                                {item.title}
                            </Typography>
                            <Typography display="block" variant="caption" color="text.secondary">
                                {item.channel}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {`${item.views} • ${item.createdAt}`}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="100%" />
                        </Box>
                    )}
                </Box>
            ))}
        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

function Profile() {
    const navigate = useNavigate()
    let mail = localStorage.getItem("email");
    const [basic, setbasic] = useState('')
    const [profile, setprofile] = useState(undefined)
    const [contact, setcontact] = useState('')
    const [education, seteducation] = useState('')
    const [works, setworks] = useState('')
    const [fields, setfields] = useState('')
    const [skills, setskills] = useState('')
    const [noprofile, setnoprofile] = useState(true)
    const getprofile = () => {
        fetch(`${apiConfig.profileapi}/profile/${localStorage.getItem("email")}`).then(data => data.json()).then(data => {
            if (data.status === 200){
                // console.log("data obtained")
                // console.log("DATATTA",data)
                setnoprofile(true)
                setprofile(data.user)
                data = data.user
                setnoprofile(false)
                setbasic(data.basic)
                // console.log(data)
                // console.log(basic[0].firstname)
                setcontact(data.contact)
                seteducation(data.education)
                setworks(data.works)
                setfields(data.fields)
                setskills(data.skills.split(","))
                localStorage.setItem("fields", data.fields.join("+"))
                // console.log(data.user.basic)
            }
            else{
                setprofile("none")
                setnoprofile(true)
            }
        })
    }
    // useEffect(() => {
    //     fetch(`${apiConfig.profileapi}/profile/${mail}`,{
    //         method:"GET"
    //     }).then(data=>data.json()).then(data=>{console.log(data.user);setfind(data.user)})
    // }, [])
    // if(find === null){
    //     console.log("no data found");
    //     navigate("/editprofile")
    // }
    useEffect(getprofile, [])

    return (
        profile === undefined ? <div>
            <div className="nodata1 container col-12 col-sm-12  col-md-12 col-lg-12 mt-3 col-xl-12 col-xxl-12 d-flex justify-content-center " >
                {/* <div className="offset-md-2 offset-lg-3 offset-sm-3" id="nodatatxt">Loading</div> */}
                <Box sx={{ overflow: 'hidden' }} >
                    <Media loading />
                    {/* <Media /> */}
                </Box>
            </div>
        </div>
            :
            noprofile ?
                <div>
                    <div>
                        <section className="bg-half ">
                            <div className="bg-overlay"></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <div className="candidates-profile-details text-center">
                                            <img src="#" height="150" alt="" className="d-block mx-auto shadow rounded-pill mb-4" />
                                            <h4 className="text-white mb-2">{localStorage.getItem("name")}</h4>
                                            <p className="text-white-50 h6 mb-2" style={{ fontSize: "20px" }}><i className="mdi mdi-bank mr-2"></i>---</p>
                                            <p className="text-white-50 h6 mb-2" style={{ fontSize: "20px" }}>---</p>
                                            <div className='mt-3'>
                                                <button onClick={(e) => navigate('/editprofile')} className='btn btn-primary '><h6>Edit Profile</h6></button>
                                            </div>

                                        </div>
                                        {/* profile */}
                                    </div>
                                    {/* col-md-6 */}

                                </div>
                                {/* row */}
                            </div>
                            {/* container */}
                        </section>
                        <div className=" d-flex justify-content-center text-muted align-items-center " style={{marginTop:150}}>
                            <h1 className="col-5 text-center ">Oops!!!...You have not filled your profile yet</h1>
                        </div>
                        <div className=" d-flex justify-content-center text-muted align-items-center mt-4 " style={{marginBottom:200}}>
                            <button className="btn btn-secondary text-center" onClick={e=>navigate("/editprofile")}>Go to Edit Profile</button>
                        </div>

                    </div>
                </div>

                : <div>
                    <div>
                        <section className="bg-half ">
                            <div className="bg-overlay"></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <div className="candidates-profile-details text-center">
                                            <img src="#" height="150" alt="" className="d-block mx-auto shadow rounded-pill mb-4" />
                                            <h4 className="text-white mb-2">{basic[0].firstname}</h4>
                                            <p className="text-white-50 h6 mb-2" style={{ fontSize: "20px" }}><i className="mdi mdi-bank mr-2"></i>{works[0].company}</p>
                                            <p className="text-white-50 h6 mb-2" style={{ fontSize: "20px" }}>{works[0].position}</p>
                                            <div className='mt-3'>
                                                <button onClick={(e) => navigate('/editprofile')} className='btn btn-primary '><h6>Edit Profile</h6></button>

                                            </div>

                                            <ul className="list-unstyled social-icon social mb-0">
                                                <li className="list-inline-item"><a href="#" className="rounded"><i className="mdi mdi-facebook"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="rounded"><i className="mdi mdi-twitter"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="rounded"><i className="mdi mdi-instagram"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="rounded"><i className="mdi mdi-google-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="About">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="text-dark">About Me :</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt-3">
                                        <div className="border rounded p-4">

                                            <p className="text-muted">I am {basic[0].firstname} {basic[0].middlename} {basic[0].surname} , I am a {basic[0].gender}....</p>

                                            <p className="text-muted">Libero venenatis faucibus ullam quis ante tiam sit amet orci eget eros faucibus tincidunt ed fringilla mauris sit amet nibh Donec sodales sagittis magna ed consequat leo eget bibendum sodales augue velit cursus nunc quis gravida magna mi libero usce vulputate eleifend sapien estibulum purus qua scelerisque ut mollis sed nonummy id metus ullam accumsan lorem Vivamus elementum semper enean vulputate eleifend tellus enean leo ligula porttitor.</p>

                                            <ul className="list-inline pt-3 border-top mb-0">
                                                <li className="list-inline-item mr-3">
                                                    <i class="fa-solid fa-location-dot px-3"></i> {contact[0].address}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* //Education */}

                                <div className="row">
                                    <div className="col-lg-12 mt-4 pt-2">
                                        <h4 className="text-dark">Education :</h4>
                                    </div>
                                </div>
                                <div className="row ">
                                    {
                                        education.map(item =>
                                            <div className="col-lg-4 col-md-6 mt-4 pt-5 ">
                                                <div className="border rounded candidates-profile-education text-center text-muted">
                                                    <div className="profile-education-icon border rounded-pill bg-white text-primary">
                                                        <i className="mdi mdi-36px mdi-briefcase-check"></i>
                                                    </div>
                                                    <h6 className="text-uppercase f-17 mt-3"><a href="#" className="text-muted">{item.university}</a></h6>
                                                    <p className="f-14 mb-1">Percentage- {item.percentage}</p>
                                                    <p className="pb-3 mb-0">{item.course}</p>

                                                    <p className="pt-3 border-top mb-0">{item.graduation}</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt-4 pt-2">
                                        <h4 className="text-dark">Experience :</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mt-3 mt-md-0 pt-3">
                                        {
                                            works.map(item =>
                                                <div className="border rounded job-list-box p-4">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="company-brand-logo text-center mb-4">

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-9 ">
                                                            <div className="job-list-desc candidates-profile-exp-desc">
                                                                <h5 className="f-19 mb-2"><a href="#" className="text-dark">{item.company}</a></h5>
                                                                <p className="text-muted mb-0 f-16">{item.position}</p>
                                                                <p className="text-muted mb-0 f-16"><span>From - </span>{item.datefrom}</p>
                                                                <p className="text-muted mb-0 f-16"><span>To - </span>{item.dateto}</p>
                                                                <p className="text-muted mb-0 f-16"><i className="mdi mdi-bank mr-2"></i>www.webthemesltd.co.in</p>
                                                                <p className="text-muted mb-0 f-16"> <i class="fa-solid fa-location-dot px-1"></i>{item.location}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt-4 pt-2">
                                        <h4 className="text-dark">Skills :</h4>
                                        <div className="row progress-box mt-4 d-flex justify-content-center">
                                            {

                                                skills.map(item =>
                                                    <span className='col-lg-2 col-3 col-md-3 col-sm-2 me-2 mt-2 px-3 d-flex justify-content-center align-items-center rounded' style={{ background: "gray", border: "4px solid gray" }}><h5 className="title me-2 mt-1 mb-1 offset-1  text-light ">{item}</h5></span>)
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-6  mt-4 pt-2">
                                        <h4 className="text-dark">Fields of Interest :</h4>
                                        <div className="row progress-box mt-4 ">
                                            {
                                                fields.map(item =>

                                                    <div className='col-md-5 col-sm-6 col-6 col-lg-3 mb-2 py-2 me-2  rounded' style={{ background: "#324ab2", border: "4px solid #324ab2" }}><h5 className="title me-2 mt-1 mb-1 offset-1  text-light ">{item}</h5></div>)

                                            }
                                            {/* <h6 className="title text-muted">Spanish</h6> */}

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt-4 pt-2">
                                        <h4 className="text-dark">Career Advice: </h4>
                                        <div className="progress-box mt-4  col-md-6 col-lg-6">
                                            <h6 className="text-muted mb-3" >Show me Jobs according to my interests</h6>
                                            <button onClick={e => navigate("/careeradvice")} className="btn btn-secondary ">Preferred Jobs</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>
                    </div>
                </div>
    )
}

export default AuthHoc(Profile)
