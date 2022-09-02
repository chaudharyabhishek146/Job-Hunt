import React from 'react'
import apiConfig from './config'
import { useFormik } from 'formik'
import * as yup from "yup"
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthHoc from './AuthHoc'
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

function Watchlist() {

  const navigate = useNavigate()
  let mail = localStorage.getItem("email");
  // console.log("mail",mail)
  const [jobs, setjobs] = useState(undefined)
  const makedata = (dat) => {
    let newj = []
    let i = 0
    for (i = 0; i < dat.length; i++) {
      // console.log({ ...dat[i].data, nid: dat[i]._id })
      dat[i].data["nid"] = dat[i]._id
      newj.push(dat[i].data)
    }
    setjobs(newj)

  }
  const getwatchs = () => {
    setjobs(undefined)
    fetch(`${apiConfig.watchApi}/watch/${mail}`, {
      method: "GET"
    }).then(data => data.json()).then(data => {
      //  console.log(data);
        makedata(data) }).catch(err =>{ 
          // console.log(err)
        })

  }
  // console.log(jobs)
  useEffect(getwatchs, [])
  // if (jobs === null) {
  //   console.log("no data found");

  // }
  const getdate = (date) => {
    if (date !== undefined) {
      let r = date.split("T")
      // console.log(r)
      return r[0]
    }
  }
  const deletewatchlist = (id) => {
    
    // console.log(id)
    fetch(`${apiConfig.watchApi}/deletewatch/${id}`, {
      method: "DELETE"
    }).then(data => data.json())
      .then(data => {
        //  console.log(data);
          getwatchs() })
      .catch(err => {
        // console.log(err)
      })

  }
  return (
    <div><div className="container col-sm-12 col-md-12 col-lg-12 mt-5 mb-5 d-flex justify-content-center pb-5"  >
      <i className="fa-solid fa-circle-heart"></i>
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
            {/* <div className="row text-dark d-flex justify-content center">
                <h3>WatchList</h3>
              </div> */}
          {
          jobs.map(item =>
            <div className="container col-9 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 mt-5 mb-5" id="nodata" >
              <div id="jobcard" className="card mb-2 mr-2 mt-2 bg-light text-dark " style={{ height: "22rem" }} >
                <div className="card-body">
                  <div className="d-flex justify-content-between me-2 mb-3">
                    {
                      item.levels[0] !== undefined ? <div className="bg-secondary text-light rounded px-2 font-weight-bold" >{item.levels[0].name}</div> : <div className="bg-secondary text-light rounded px-2 font-weight-bold" >No Level</div>
                    }
                    <i onClick={(e) => {deletewatchlist(item.nid);alert("Deleted From Your WatchList")}} className="fa-solid fa-trash-can"></i>
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
                  {/* <i className="fa-solid fa-heart" style={{ color: "red" }} /> */}
                  </div>

                </div>
              </div>
            </div>
          ) }</div>
          : <div className="nodata container col-9 col-sm-12 col-md-5 col-lg-4 col-xl-3 col-xxl-3" >
            <div className="" id="nodatatxt">Oops! nothing in your WatchList...</div>
            <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?w=826&t=st=1661375835~exp=1661376435~hmac=2e442c4fd53d5b949ba3da522cb0e3dcf746af0b541d945c285bb7f45ee53b3d" alt="" style={{ width: "100%" }} />
          </div>
        // :null
      }
    </div>

    </div>
  )
}

export default AuthHoc(Watchlist)
