import React from 'react';
import {useFormik} from "formik"; 

export default function AddContacts() {
   const formik=useFormik({
    initialValues:{
        firstname:'',
        lastname:''
    },
    onSubmit:values => {
        console.log(values);
    }
   })
  return (
    <div>

    <form onSubmit={formik.handleSubmit}>
        
    <div className="form-group">
  
    <input type="text" className="form-control" id="firstname" onChange={formik.handleChange} value={formik.values.firstname} aria-describedby="emailHelp" placeholder="First Name"/>

    <input type="text" className="form-control" id="lastname" onChange={formik.handleChange} value={formik.values.lastname} aria-describedby="emailHelp" placeholder="Last Name"/>
    <button type="submit" className="btn btn-success">Submit</button>
  </div>
    </form>
    </div>
  )
}
