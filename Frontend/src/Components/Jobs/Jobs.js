import React from 'react'
import AppContext from '../context/appcontext'
import { useContext } from 'react'
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
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

export default function Jobs(props) {
    const { state, dispatch } = useContext(AppContext)
    const nav = useNavigate()
    return (
        <div className="row col-sm-8 col-md-9 col-lg-10" >
            <i className="fa-solid fa-circle-heart"></i>
            {
                (props.jobs === undefined) ?
                    // Loading

                    // <div className="nodata container col-9 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 mt-3" >
                    //     <div className="offset-md-2 offset-lg-3 offset-sm-3" id="nodatatxt">Loading</div>
                    //     <img src="https://2.bp.blogspot.com/-AEq7PhrFev0/V8uoZHZ5zOI/AAAAAAAACAY/Ck3z6Gu2hbcMPjhh7ASYeYTWItP5L2nMQCLcB/s320/1.gif" alt="" style={{ width: "100%" }} />
                    // </div>

                    <div className="nodata1 container col-12 col-sm-12  col-md-12 col-lg-12 mt-3 col-xl-12 col-xxl-12 d-flex justify-content-center " >
                        {/* <div className="offset-md-2 offset-lg-3 offset-sm-3" id="nodatatxt">Loading</div> */}
                        <Box sx={{ overflow: 'hidden' }} >
                            <Media loading />
                            {/* <Media /> */}
                        </Box>
                    </div>


                    // LOADING
                    : (props.jobs.length !== 0) ?
                        //  (props.job.length!==0) ?
                        props.jobs.map(item =>
                            <div className="container col-10 offset-2 offset-md-0 offset-lg-0 col-md-6 col-lg-4  col-xl-3 col-xxl-3" id="nodata" >
                                <div id="jobcard" className=" card mb-2 mt-2  bg-light text-dark" style={{ height: "20rem",border:"1px solid gray",borderRadius:"10px" }} >
                                    <div className="card-body ">
                                        <div className="d-flex justify-content-between me-2 mb-3">
                                            {
                                                item.levels[0] !== undefined ? <div className="bg-secondary text-light rounded px-2 font-weight-bold" >{item.levels[0].name}</div> : <div className="bg-secondary text-light rounded px-2 font-weight-bold" >No Level</div>
                                            }
                                        </div>
                                        <div className="container" id="overflow" style={{ height: "10rem", overflow: "auto" }} >
                                            <h5 className="card-title mb-3">{item.name}</h5>

                                            {
                                                item.categories.map(cat => <span className='mb-4 text-info font-weight-bold'><i className="fa-solid me-2 fa-align-left"></i>{cat.name} </span>)
                                            }<br />

                                            {
                                                item.locations.map(loc => <span className='mb-4 text-danger'><i className="me-2 fa-solid fa-location-dot" ></i>{loc.name}</span>)
                                            }<br />
                                            <span>
                                                <i className="fa-solid fa-building me-2 " style={{ color: "black" }}></i>
                                                {item.company.name}
                                            </span><br />
                                            <span className='text-secondary'>
                                                <i className="fa-solid fa-calendar-days me-2"></i>{props.getdate(item.publication_date)}
                                            </span>

                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between me-2 mb-2">
                                        <div className='offset-1 mb-2'><a href={item.refs.landing_page} className="me-2 card-linkeight-bold font-w btn btn-primary " style={{ width: 60, height: 30, borderRadius: 8, fontFamily: 'sans-serif', fontSize: 13 }}>Apply</a>
                                        </div>
                                        {
                                            state ? <div className='me-3'> <i onClick={(e) => { props.AddWatchlist(item) ; alert("Added To Your WatchList")}} className="fa-solid fa-heart" style={{ color: "red" }} />
                                            </div> : null
                                        }

                                    </div>
                                </div>
                            </div>
                        ) : <div className="nodata container col-9 col-sm-12 col-md-5 col-lg-4 col-xl-3 col-xxl-3" >
                            <div className="mt-5" id="nodatatxt">
                                No Jobs Found
                                <div>
                                    <button onClick={async (e) => {
                                        props.setjobs(undefined)
                                       props.GetJobData()
                                    }



                                    } className="btn btn-dark">Take me back</button>
                                </div> </div>
                            <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?w=826&t=st=1661375835~exp=1661376435~hmac=2e442c4fd53d5b949ba3da522cb0e3dcf746af0b541d945c285bb7f45ee53b3d" alt="" style={{ width: "100%" }} />
                        </div>
                // :null
            }
        </div>

    )
}
