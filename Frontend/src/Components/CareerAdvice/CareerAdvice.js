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
import AuthHoc from '../AuthHoc'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import apiConfig from '../config';

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

function CareerAdvice() {

    const navigate = useNavigate()
    let mail = localStorage.getItem("email");
    // console.log("mail",mail)
    const [jobs, setjobs] = useState(undefined)
    const [page, setpage] = useState(1)
    const [Tpage, setTpage] = useState(10)
    const [fcat, setfcat] = useState([])

    const getCategory = () => {
        let p = 1
        var c, d, l, desc;
        c = "none"
        let category = localStorage.getItem("fields")
        d = category
        setfcat(category)
        l = "none"
        desc = "none"
        // console.log(c, d, l, desc)
        setpage(1)
        setjobs(undefined)

        fetch(`${apiConfig.extApi}/jobs/${c}/${d}/${desc}/${l}/${page}`).then(data => data.json()).then(data => {
            // console.log(data);
            setjobs(data.results);
            setTpage(data.page_count)
        })

    }


    const getPagination = (page) => {
        var c, d, l, desc;
        c = "none"
        // let category = localStorage.getItem("fields")
        d = fcat
        l = "none"
        desc = "none"
        // console.log(c, d, l, desc)
        setpage(page)
        setjobs(undefined)

        fetch(`${apiConfig.extApi}/jobs/${c}/${d}/${desc}/${l}/${page}`).then(data => data.json()).then(data => {
            // console.log(data);
            setjobs(data.results);
            setTpage(data.page_count)
        })

    }

    const getdate = (date) => {
        if (date !== undefined) {
            let r = date.split("T")
            // console.log(r)
            return r[0]
        }
    }
    const AddWatchlist = (item) => {
        fetch(`${apiConfig.watchApi}/addwatch/${localStorage.getItem('email')}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(item)

        }).then(data => data.json()).then(data =>{
            // console.log(data)
        }
             )
    }

    useEffect(getCategory, [])

    return (
        <div><div className="container col-sm-12 col-md-12 col-lg-12 mt-5 mb-5 d-flex justify-content-center pb-5"  >
            {/* <i className="fa-solid fa-circle-heart"></i> */}
            {

                (jobs === undefined) ? <div className="nodata1 container col-12 col-sm-12  col-md-12 col-lg-12 mt-3 col-xl-12 col-xxl-12 d-flex justify-content-center " >
                    {/* <div className="offset-md-2 offset-lg-3 offset-sm-3" id="nodatatxt">Loading</div> */}
                    <Box sx={{ overflow: 'hidden' }} >
                        <Media loading />
                        {/* <Media /> */}
                    </Box>
                </div> : (jobs.length !== 0) ?
                    //  (props.job.length!==0) ?
                    <div className="row ">
                        <div className="row"><h2 className="text-muted">Preferred Jobs</h2></div>

                        {
                            jobs.map(item =>
                                <div className="container col-9 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 mt-5 mb-5" id="nodata" >
                                    <div id="jobcard" className="card mb-2 mr-2 mt-2 bg-light text-dark " style={{ height: "22rem" }} >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between me-2 mb-3">
                                                {
                                                    item.levels[0] !== undefined ? <div className="bg-secondary text-light rounded px-2 font-weight-bold" >{item.levels[0].name}</div> : <div className="bg-secondary text-light rounded px-2 font-weight-bold" >No Level</div>
                                                }
                                                {/* <i onClick={(e) => deletewatchlist(item.nid)} className="fa-solid fa-trash-can"></i> */}
                                            </div>
                                            <div className="row " id="overflow" style={{ height: "12rem", overflow: "auto" }} >
                                                <h5 className="card-title mb-3">{item.name}</h5>

                                                {
                                                    item.categories.map(cat => <span className='mb-2 text-info font-weight-bold'><i className="fa-solid me-2 fa-align-left"></i>{cat.name} </span>)
                                                }<br />

                                                {
                                                    item.locations.map(loc => <span className='mb-2 text-danger'><i className="me-2 fa-solid fa-location-dot" ></i>{loc.name}</span>)
                                                }<br />
                                                <span>
                                                    <i className="fa-solid fa-building me-2 " style={{ color: "black" }}></i>
                                                    {item.company.name}
                                                </span><br />
                                                <span className='text-secondary'>
                                                    <i className="fa-solid fa-calendar-days me-2"></i>{getdate(item.publication_date)}
                                                </span>

                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between me-2 mb-2">
                                            <div className='offset-1 mb-2'><a href={item.refs.landing_page} className="me-2 card-linkeight-bold font-w btn btn-primary " style={{ width: 60, height: 30, borderRadius: 8, fontFamily: 'sans-serif', fontSize: 13 }}>Apply</a>
                                            </div>
                                            <div className='me-3'>
                                                <i onClick={e =>{ AddWatchlist(item);alert("Added To WatchList") }} className="fa-solid fa-heart" style={{ color: "red" }} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}</div>
                    : <div className="nodata container col-9 col-sm-12 col-md-5 col-lg-4 col-xl-3 col-xxl-3" >
                        <div className="" id="nodatatxt">Oops! nothing in your JobList Preferences or you might have reached the end of results...</div>
                        <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?w=826&t=st=1661375835~exp=1661376435~hmac=2e442c4fd53d5b949ba3da522cb0e3dcf746af0b541d945c285bb7f45ee53b3d" alt="" style={{ width: "100%" }} />
                    </div>
                // :null
            }
        </div>
            <div className="container-fluid pt-5 pb-5">
                <div className="row ">
                    <div className=" col-md-12 col-12 col-lg-12 me-3 d-flex justify-content-center align-items-center ">
                        <Stack spacing={2}>
                            <Pagination page={page} siblingCount={0} boundaryCount={2} defaultPage={1} onClick={e => getPagination(e.target.textContent)} onChange={(e, n) => { setjobs(undefined); getPagination(n) }} count={Tpage} shape="rounded" color="secondary" />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthHoc(CareerAdvice)
