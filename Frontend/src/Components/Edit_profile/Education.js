import React from 'react'
import { Button,IconButton } from "@mui/material"
import BackspaceIcon from '@mui/icons-material/Backspace';

const Education = ({
    index,
  item,
  handleChangeEducation,
  handleRemoveEducation,
  handleAddEducation,
  values,
  inputEducation
}) => {
  return (
    <div>
        <div className="col-12 mt-3">
            <IconButton onClick={handleRemoveEducation} className="float-end">
                <BackspaceIcon />
                </IconButton>
                <div className="custom-form p-4 border rounded">
                
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group app-label">
                                <label className="text-muted">Graduation:</label>
                                <input id="graduation"
                                type="text" className="form-control resume"
                                placeholder="Graduation"
                                name="graduation"
                                
                                onChange={(event) => handleChangeEducation(event, index)}
                                value={item.graduation}
                                />
                        
                                
                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group app-label">
                                <label className="text-muted">University/College:</label>
                                <input 
                                id="university/college" type="text" className="form-control resume" placeholder="College"
                                name="university"
                                onChange={(event) => handleChangeEducation(event, index)}
                                value={item.university}
                                />
                            
                            </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Degree/Certification:</label>
                            <input id="degree/certification" 
                            type="text" className="form-control resume" 
                            placeholder="Degree" 
                            name="degree"
                                onChange={(event) => handleChangeEducation(event, index)}
                                value={item.degree}/>
                        </div>
                    </div>

                    <div className="col-lg-6">

                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Percentage %/CGPA:</label>
                            <input id="percentage" type="number" className="form-control resume" placeholder="Percentage"
                            name="percentage"
                            onChange={(event) => handleChangeEducation(event, index)}
                            value={item.percentage}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Course Title:</label>
                            <input id="course-title" type="text" className="form-control resume" placeholder="Course" 
                            name="course"
                            onChange={(event) => handleChangeEducation(event, index)}
                            value={item.course}/>
                        </div>
                    </div>

            <div>
                
            
            </div>
            
            </div>
            
            
            
        </div>
        </div>

    </div>
  )
}

export default Education
