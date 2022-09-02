import React from 'react'
import AuthHoc from '../AuthHoc'
import "./Home.css"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import apiConfig from '../config'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from '../Search/Search'
import Sort from "../Sort/Sort"
import Jobs from '../Jobs/Jobs'
import AppContext from '../context/appcontext';
import { Navigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const [log, setlog] = useState(undefined)
  const [jobs, setjobs] = useState(undefined)
  const [page, setpage] = useState(1)
  const [Tpage, setTpage] = useState(10)
  const [level, setlevel] = useState("none")
  const [order, setorder] = useState(false)
  const [comps, setcomps] = React.useState([]);//store selected catgegory
  const [fcat, setfcat] = React.useState([]);//store selected companies
  // const { state, dispatch } = useContext(AppContext);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getuser = async () => {
  //     await fetch("http://localhost:3001/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           return response.json();
  //         }
  //         // localStorage.clear()
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {

  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   if (user !== null) {
  //     console.log("setting.....")
  //     if (localStorage.getItem("verification") !== true) {
  //       console.log("setting localstorage")
  //       localStorage.setItem("type", "google")
  //       localStorage.setItem("email", user.profile._json.email)
  //       localStorage.setItem("name", user.profile._json.name)
  //       localStorage.setItem("id", user._id)
  //       localStorage.setItem("verification", true)
  //       dispatch({ type: "LOGIN" })
  //       setlog(true)
  //       // navigate("/")
  //       {<Navigate to="/" />}
  //     }
  //     else {
  //       // console.log("verif")
  //       // dispatch({ type: "LOGIN" })
  //       setlog(true)
  //     }
  //   }
  //   else {
  //     localStorage.setItem("verification", false)
  //     setlog(false)
  //   }


  // }, [])



  // console.log(user)


  const AddWatchlist = (item) => {
    fetch(`${apiConfig.watchApi}/addwatch/${localStorage.getItem('email')}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(item)

    }).then(data => data.json()).then(data => {
      // console.log(data)
    })
  }
  const GetJobData = () => {
    fetch(`${apiConfig.extApi}/jobs/${page}`).then(data => data.json()).then(data => {
      // console.log(data.results);
       setjobs(data.results); setTpage(data.page_count)
    })
  }
  const ChangePage = (newpage) => {
    // console.log("new page", newpage)
    // console.log("page", page)
    setpage(newpage)
    // GetJobData()
    getFiltered(newpage)
  }
  const getdate = (date) => {
    if (date !== undefined) {
      let r = date.split("T")
      // console.log(r)
      return r[0]
    }
  }
  useEffect(GetJobData, [])
  // console.log("jobs", jobs)

  const getFiltered = (page) => {
    var c, d, l, desc;
    if (comps.length === 0)
      c = "none"
    else
      c = comps.join("+")
    if (fcat.length === 0)
      d = "none"
    else
      d = fcat.join("+")
    if (level === "none")
      l = "none"
    else
      l = level
    if (order === "none")
      desc = "none"
    else
      desc = order
    // console.log(c, d, l, desc)
    // comps === "none" ? c = "non" : c = comps.join("+")
    // fcat === "none" ? d = "non" : d = fcat.join("+")
    // props.level === "none" ? l = "non" : l = props.level
    // props.order === "none" ? desc = "non" : desc = props.order
    fetch(`${apiConfig.extApi}/jobs/${c}/${d}/${desc}/${l}/${page}`).then(data => data.json()).then(data => {

      // console.log(data);
      // if (data.results.length === 0)
      //   GetJobData()
      // else
      setjobs(data.results);
      setTpage(data.page_count)
    })
  }


  // React.useEffect(getFiltered, [])

  const getCategory = (category, page) => {
    var c, d, l, desc;
    c = "none"
    d = category
    setfcat(category.split("+"))
    l = "none"
    desc = "none"
    // console.log(c, d, l, desc)
    setpage(page)
    setjobs(undefined)

    fetch(`${apiConfig.extApi}/jobs/${c}/${d}/${desc}/${l}/${page}`).then(data => data.json()).then(data => {

      // console.log(data);
      // if (data.results.length === 0)
      //   GetJobData()
      // else
      setjobs(data.results);
      setTpage(data.page_count)
    })

  }
  // useEffect(googleauth, [])
  // useEffect(getuser, [])

  return (
    // <div>
    //   {
    //     (log === undefined) ? <div>Loading</div> :
    <div className="w-100">
      <section className="bg-home w-100">

        <div className="home-center">
          <div className="home-desc-center">

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="title-heading text-center text-white">
                    <h6 className="small-title text-uppercase text-light mb-3">The journey to your dream job begins here</h6>
                    <h1 className="heading font-weight-bold mb-4">You have made it here</h1>
                  </div>
                </div>
              </div>
              {/* SEARCH */}

              <div className="home-form-position">

                <div className="row">
                  <div className="col-lg-12 container d-flex justify-content-center " id="cont">
                    <div className="home-registration-form container-fluid p-4 mb-3 col-md-6 col-sm-8 col-10 col-lg-12">
                      <form className="registration-form">
                        <div className=" row d-flex justify-content-center ">

                          <Search sfun={GetJobData} fun={setjobs} pageno={page} level={level} order={order} setcomps={setcomps} setfcat={setfcat} />
                          <div className="container  col-lg-3 col-md-6 mt-4 ">
                            <div className="registration-form-box d-flex justify-content-center">
                              <input onClick={(e) => {
                                setpage(1)
                                setjobs(undefined)
                                getFiltered(1)
                              }} name="send" className="btn btn-success btn-block " style={{ width: 344 }} value="Submit" />
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* end  search*/}
            </div>
          </div>
        </div>
      </section>

      {/* {cover end} */}


      <div className='container-fluid bg-light'>
        <div className="row">
          {/* CATEGOREIS */}

          <div className="container mt-4">
            <section className="section">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="section-title text-center mb-2 ">
                      <h4 className="title title-line pb-2">Popular Category</h4>
                      <p className="text-muted para-desc mx-auto mb-1">Explore the jobs of the popular categories</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Software Engineer+Software Engineering+Computer and IT", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3">
                          <i className="fa-solid fa-user-gear fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Software Egineering</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Data and Analytics+Data Science", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3">
                          <i className="fa-solid fa-chart-line fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Data Science</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Administration and Office+Bussiness Operations+Corporate+Management", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3">
                          <i className="fa-solid fa-landmark fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Administration</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Accounting+Accounting and Finance+Account Management", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3 ">
                          <i className="fa-solid fa-hand-holding-dollar fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Accounting / Finance</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Construction+Energy Generation and Mining", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3 ">
                          <i className="fa-solid fa-helmet-safety fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Construction / Facilities</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Customer Service+Media, PR, and Communinications+Public Relations", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3 ">
                          <i className="fa-solid fa-satellite fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Tele-communications</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("Writing and Editing+Writer+Videography+UX+Entertainment and Travel Services+Design and UX+Design", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3">
                          <i className="fa-solid fa-film fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Design &amp; Multimedia</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 pt-2">
                    <a onClick={e => getCategory("HR+Human Resources and Recruitment+Public Relations+Administration and Office", 1)}>
                      <div className="popu-category-box bg-light rounded text-center p-4">
                        <div className="popu-category-icon mb-3">
                          <i className="fa-solid fa-user-tie fa-4x" style={{ color: "blueviolet" }}></i>
                        </div>
                        <div className="popu-category-content">
                          <h5 className="mb-2 text-dark title">Human Resource</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-12 text-center mt-4 pt-2">
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* END OF CATEGORIES */}


          <div className="row">

            <div className="col-sm-3 col-md-3 col-lg-2  mt-2 me-3 d-flex justify-content-center align-items-center" style={{ height: 500 }}>
              <ul className=" ml-2 " style={{ width: 250 }}>
                <Sort setlevel={setlevel} setorder={setorder} />
                <button onClick={(e) => {
                  setjobs(undefined)
                  setpage(1)
                  getFiltered(page)
                }} className="btn btn-primary">Apply Filter</button>
              </ul>
            </div>

            {/* // CARDS // */}
            <Jobs jobs={jobs} setjobs={setjobs} getdate={getdate} GetJobData={GetJobData} AddWatchlist={AddWatchlist} />
          </div>


          {/* pagination */}



        </div>
        {/* row */}
        <div className="container-fluid pt-5 pb-5">
          <div className="row ">
            <div className="me-3 d-flex justify-content-center align-items-center ">
              <Stack spacing={2}>
                <Pagination page={page} siblingCount={0} boundaryCount={2} defaultPage={1} onClick={e => getFiltered(e.target.textContent)} onChange={(e, n) => { setjobs(undefined); ChangePage(n) }} count={Tpage} shape="rounded" color="secondary" />
              </Stack>
            </div>
          </div>
        </div>

      </div>
    </div>

    //   }
    // </div>

  )
}

export default Home
