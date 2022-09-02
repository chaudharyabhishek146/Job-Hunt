import React from 'react'
import { IconButton } from "@mui/material"
import BackspaceIcon from '@mui/icons-material/Backspace';

const Work_experience = ({
    inputWork,
    index,
    item,
    handleChangeWork,
    handleRemoveWork,
    handleAddWork}) => {

  return (
    <div>
        <div className="col-12 mt-3">
            <IconButton onClick={handleRemoveWork} className="float-end">
                <BackspaceIcon />
            </IconButton>
            <div className="custom-form p-4 border rounded">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group app-label">
                            <label className="text-muted">Company Name:</label>
                            <input id="company-name" required
                             name="company" onChange={(event) => handleChangeWork(event, index)}
                             value={item.company}
                             type="text" className="form-control resume" placeholder="" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group app-label">
                            <label className="text-muted">Job Position:</label>
                            <input id="job-position" name="position"
                            required
                            type="text" className="form-control resume" 
                            onChange={(event) => handleChangeWork(event, index)}
                             value={item.position}
                            placeholder="Role" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Location:</label>
                            <div className="form-button">
                                <select className="form-select" name="location"
                                 style={{ marginTop: "15px" }} required onChange={(event) => handleChangeWork(event, index)}
                                 value={item.location}
                                 aria-label="Default select example">
                                    <option data-display="Search">Search</option>
                                    <option value="New York">New York</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="Houston">Houston</option>
                                    <option value="India">India</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group app-label">
                                    <label style={{ marginTop: "20px" }} className="text-muted">Date From:</label>
                                    <input name="datefrom" onChange={(event) => handleChangeWork(event, index)}
                             value={item.datefrom}
                                    style={{ marginTop: "15px" }} id="date-from"required
                                     type="date" className="form-control resume" placeholder="01-Jan-2018" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group app-label">
                                    <label style={{ marginTop: "20px" }} className="text-muted">Date To:</label>
                                    <input name="dateto" style={{ marginTop: "15px" }} 
                                    onChange={(event) => handleChangeWork(event, index)}
                                    value={item.dateto}
                                    id="date-to" type="date" className="form-control resume"
                                    required
                                     placeholder="31-March-2019" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Work_experience