import React from 'react'

const Contactinfo = ({
    inputContact,
    index,
    item,
    handleChangeContact}) => {

  return (
    <div>
        <div className="col-12 mt-3">
            <div className="custom-form p-4 border rounded">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label className="text-muted">City</label>

                            <input
                                type="text" required
                                name="city"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.city  } 
                               
                                id="city" style={{ marginTop: "15px" }} className="form-control resume" placeholder="City" />

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label className="text-muted">State*:</label>

                            <input
                                required
                                name="state"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.state  } 

                                id="state" style={{ marginTop: "15px" }} type="text" className="form-control resume" placeholder="State" />

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label className="text-muted">Country*:</label>

                            <input
                                type="text" required
                                name="country"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.country  } 
                                id="country" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Country" />

                                
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Phone:</label>
                            <input
                                type="number" required
                                name="phone"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.phone  } 

                                id="phone" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Phone No. :" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">E-mail*:</label>
                            <input
                                type="email"
                                name="email" required
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.email  } 
                            
                                id="e-mail" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Email ID :" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Pincode*:</label>
                            <input
                                type="number"
                                name="pin" required
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.pin  } 
                                id="number" style={{ marginTop: "15px" }} className="form-control resume" placeholder="Pincode:" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">Github:</label>
                            <input
                                type="url"

                                name="github"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.github  } 
                                id="Github" style={{ marginTop: "15px" }} className="form-control resume" placeholder="www.github.com" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} className="text-muted">LinkedIn:</label>
                            <input

                                name="linkedin"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.linkedin } 
                                id="Linkedin" style={{ marginTop: "15px" }} type="url" className="form-control resume" placeholder="www.LinkedIn.com" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group app-label" >
                            <label style={{ marginTop: "20px" }} className="text-muted">Website:</label>
                            <input

                                name="website"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.website  } 
                                id="website" style={{ marginTop: "15px" }} type="url" className="form-control resume" placeholder="www.portfollio.com" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group app-label">
                            <label style={{ marginTop: "20px" }} >Address :</label>
                            <textarea
                                type="text"
                                name="address"
                                onChange={(event) => handleChangeContact(event, index)}
                                value={item.address  } 
                                id="address" rows="4" style={{ marginTop: "15px" }} className="form-control resume" placeholder=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                        
    </div>
  )
}

export default Contactinfo;