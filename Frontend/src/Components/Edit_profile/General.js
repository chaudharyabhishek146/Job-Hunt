import React from 'react'
import Defaultprofilephoto from "../../assests/img/default profile photo.png"


const General = ({
    index,
    item,
    handleChangeGeneral,
    inputGeneral }) => {


    return (
        <div>
            <div className="col-12 mt-3">
                <div className="custom-form p-4 border rounded">
                    {/* <img src={Defaultprofilephoto} className="img-fluid avatar avatar-medium d-block mx-auto rounded-pill" alt="photo" /> */}
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="form-group app-label ">
                                <label className="text-muted">First Name<span className="text-danger">*</span> :</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    required
                                    onChange={(event) => handleChangeGeneral(event, index)}
                                    value={item.firstname}
                                    id="first-name" style={{ marginTop: "15px" }} className="form-control resume" placeholder="First Name " />

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group app-label">
                                <label className="text-muted">Middle Name<span className="text-danger"></span> :</label>
                                <input
                                    type="text"
                                    name="middlename"
                                    onChange={(event) => handleChangeGeneral(event, index)}
                                    value={item.middlename}
                                    id="middle-name" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Middle Name " />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group app-label">
                                <label className="text-muted">Surname<span className="text-danger">*</span> :</label>
                                <input
                                    type="text"
                                    required
                                    name="surname"
                                    onChange={(event) => handleChangeGeneral(event, index)}
                                    value={item.surname}
                                    id="surname-name" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Surname " />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group app-label">
                                <label className="text-muted" style={{ marginTop: "20px" }} >Date Of Birth<span className="text-danger">*</span> :</label>
                                <input
                                    onChange={(event) => handleChangeGeneral(event, index)}
                                    required
                                    value={item.dob}
                                    name="dob"
                                    id="date-of-birth" type="date" style={{ marginTop: "15px" }} className="form-control resume" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group app-label">
                                <label className="text-muted" style={{ marginTop: "20px" }}>Sex<span className="text-danger">*</span> :</label>
                                <div className="form-button " style={{ marginTop: "15px" }}>
                                    <select
                                        name="gender" required
                                        //placeholder="Select a Gender"
                                        onChange={(event) => handleChangeGeneral(event, index)}
                                        value={item.gender}
                                        className="form-select" aria-label="Default select example">
                                        <option data-display="Search">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group app-label">
                                <label className="text-muted" style={{ marginTop: "20px" }}>Marital Status<span className="text-danger">*</span> :</label>
                                <div className="form-button" >
                                    <select
                                        name="marital"
                                        onChange={(event) => handleChangeGeneral(event, index)}
                                        value={item.marital} required
                                        className="form-select" style={{ marginTop: "15px" }} aria-label="Default select example">
                                        <option data-display="Status">Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Un-Married</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default General