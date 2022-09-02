import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import Defaultprofilephoto from "../../assests/img/default profile photo.png"
import { Select } from 'react-select'
//import Education from './Education'
import Landing_edit from './landing-edit'
import General from './General'
import Contactinfo from './contactinfo'
import Education from './Education'
import Work from './work_experience'
import apiConfig from '../config'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate } from "react-router-dom";
import AuthHoc from '../AuthHoc'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const gender = [
//     { value: "Male", label: "Male" },
//     { value: "Female", label: "Female" },
//     { value: "Other", label: "Other" },
//     { value: "Prefer not to say", label: "Prefer not to say" },
// ]
var category = [
    "Accounting",
    "Accounting and Finance",
    "Account Management",
    "Administration and Office",
    "Advertising and Marketing",
    "Animal Care",
    "Arts",
    "Business Operations",
    "Cleaning and Facilities",
    "Computer and IT",
    "Construction",
    "Corporate",
    "Customer Service",
    "Data and Analytics",
    "Data Science",
    "Design",
    "Design and UX",
    "Editor",
    "Edunameion",
    "Energy Generation and Mining",
    "Entertainment and Travel Services",
    "Farming and Outdoors",
    "Food and Hospitality Services",
    "Healthcare",
    "HR",
    "Human Resources and Recruitment",
    "Installation, Maintenance, and Repairs",
    "Law",
    "Legal Services",
    "Management",
    "Manufacturing and Warehouse",
    "Marketing",
    "Mechanic",
    "Media, PR, and Communinications",
    "Mental Health",
    "Nurses",
    "Office Administration",
    "Personal Care and Services",
    "Physical Assistant",
    "Product",
    "Product Management",
    "Project Management",
    "Protective Services",
    "Public Relations",
    "Real Estate",
    "Recruiting",
    "RetailSales",
    "Science and Engineering",
    "Social Services",
    "Software Engineer",
    "Software Engineering",
    "Sports, Fitness, and Recreation",
    "Transportation and Logistics",
    "Unknown",
    "UX",
    "Videography",
    "Writer",
    "Writing and Editing"
]

function Edit_profile() {
    const navigate = useNavigate();
    const [story, setStory] = useState({})
    const [skillset, setskillset] = useState("");
    const [interest, setinterest] = useState([]);
    const [inputGeneral, setinputGeneral] = useState([{
        firstname: '',
        middlename: '',
        surname: '',
        dob: '',
        gender: '',
        marital: ''
    }
    ]

    )
    const handleChangeGeneral = (event, index) => {

        const values = [...inputGeneral]
        // console.log("general", values)
        values[index][event.target.name] = event.target.value

        setinputGeneral(values)
        //console.log(inputGeneral)
    }
    const [inputContact, setinputContact] = useState([{
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        pin: '',
        github: '',
        linkedin: '',
        website: '',
        address: ''

    }])

    const handleChangeContact = (event, index) => {

        const values = [...inputContact]
        // console.log("Contact", values)
        values[index][event.target.name] = event.target.value

        setinputContact(values)
        //console.log(inputGeneral)
    }

    const [inputEducation, setinputEducation] = useState([
        {
            graduation: "",
            university: "",
            degree: "",
            percentage: "",
            course: ""
        }
    ])
    const handleChangeEducation = (event, index) => {

        const values = [...inputEducation]
        // console.log("education", values)
        values[index][event.target.name] = event.target.value

        setinputEducation(values)
    }



    // adds new input
    const handleAddEducation = () => {
        setinputEducation([
            ...inputEducation,
            {
                graduation: "",
                university: "",
                degree: "",
                percentage: "",
                course: ""
            }
        ])
    }

    // removes input
    const handleRemoveEducation = (index) => {
        if (inputEducation.length !== 0) {
            const values = [...inputEducation]
            values.splice(index, 1)
            setinputEducation(values)
        }
    }

    const [inputWork, setinputWork] = useState([
        {
            company: "",
            position: "",
            location: "",
            datefrom: "",
            dateto: ""
        }
    ])
    const handleChangeWork = (event, index) => {

        const values = [...inputWork]
        // console.log("Work", values)
        values[index][event.target.name] = event.target.value

        setinputWork(values)
    }
    const handleAddWork = () => {
        setinputWork([
            ...inputWork,
            {
                company: "",
                position: "",
                location: "",
                datefrom: "",
                dateto: ""
            }
        ])
    }

    // removes input
    const handleRemoveWork = (index) => {
        if (inputWork.length !== 0) {
            const values = [...inputWork]
            values.splice(index, 1)
            setinputWork(values)
        }
    }

    const handleskillset = (event) => {
        setskillset(event.target.value)
    }
    // console.log(skillset)
    const handleinterest = (event) => {

        setinterest(event.target.value)
    }


    const getprofile = () => {
        fetch(`${apiConfig.profileapi}/profile/${localStorage.getItem("email")}`).then(data => data.json()).then(data => {
            // console.log(data)
            if (data.status === 200) {
                data = data.user
                // console.log("data", data)
                setinputGeneral(data.basic);
                setinputContact(data.contact);
                setinputEducation(data.education);
                setinputWork(data.works);
                setinterest(data.fields);
                setskillset(data.skills);
            }



        }
        )

    }
    useEffect(getprofile, [])

    //console.log(inputEducation)
    const handleSubmit = async (e) => {
        // console.log(e)
        e.preventDefault()
        await setStory({ general: [...inputGeneral], contact: [...inputContact], education: [...inputEducation], work: [...inputWork], skills: skillset, interest: interest })
        await fetch(`${apiConfig.profileapi}/addprofile/${localStorage.getItem("email")}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                basic: inputGeneral,
                contact: inputContact,
                education: inputEducation,
                works: inputWork,
                fields: interest,
                skills: skillset

            })

        }).then(data => data.json()).then(data => {
            // console.log(data)
            if (data.status === 200) {
                navigate("/profile")
            }
        }
        )
    }
    // console.log("jenii", story)

    return (

        <form onSubmit={handleSubmit}>
            <Landing_edit />
            <section className='About'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className=" col-md-12">
                            <h5 className='text-dark'>General Information:</h5>
                        </div>
                        {inputGeneral.map((item, index) => (
                            <div key={index}>
                                <General
                                    inputGeneral={inputGeneral}
                                    index={index}
                                    item={item}
                                    handleChangeGeneral={handleChangeGeneral}
                                />

                            </div>
                        ))}

                    </div>


                    {/* Contact Information */}

                    <div className="row mt-5">
                        <div className="col-12">
                            <h5 className="text-dark">Contact Information :</h5>
                        </div>

                        {inputContact.map((item, index) => (

                            <div key={index}>
                                <Contactinfo
                                    inputContact={inputContact}
                                    index={index}
                                    item={item}
                                    handleChangeContact={handleChangeContact}


                                />

                            </div>
                        ))}
                    </div>


                    {/* <Education /> */}

                    <div className="row">
                        <div className="col-12 mt-5">
                            <h5 className="text-dark">Education  : </h5>
                        </div>
                        {inputEducation.map((item, index) => (

                            <div key={index}>
                                <Education
                                    inputEducation={inputEducation}
                                    index={index}
                                    item={item}
                                    handleChangeEducation={handleChangeEducation}
                                    handleRemoveEducation={handleRemoveEducation}
                                    handleAddEducation={handleAddEducation}
                                />

                            </div>
                        ))}
                        <div className="col-12 ">
                            <button type="button" onClick={handleAddEducation} className="btn btn-primary mt-1 float-end">
                                Add
                            </button>
                        </div>

                    </div>
                    <div>

                    </div>



                    {/* Work Expiernece */}
                    <div className="row">
                        <div className="col-12 mt-2">
                            <h5 className="text-dark">Work Experience : </h5>
                        </div>
                        {inputWork.map((item, index) => (

                            <div key={index}>
                                <Work
                                    inputWork={inputWork}
                                    index={index}
                                    item={item}
                                    handleChangeWork={handleChangeWork}
                                    handleRemoveWork={handleRemoveWork}
                                    handleAddWork={handleAddWork}
                                />

                            </div>
                        ))}
                        <div className="col-12 ">
                            <button type="button" onClick={handleAddWork} className="btn btn-primary mt-1 float-end">
                                Add
                            </button>
                        </div>


                    </div>

                    {/* Skills */}

                    <div className="row">
                        <div className="col-12 mt-5">
                            <h5 className="text-dark">Skills : </h5>
                        </div>

                        <div className="col-12 mt-3">
                            <div className="custom-form p-2 pt-3 border rounded">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group app-label">
                                            <input id="skills" type="text"
                                                className="form-control resume"
                                                name="skills"
                                                placeholder="HTML, CSS, PHP, javascript, ..."
                                                onChange={(event) => handleskillset(event)}
                                                value={skillset} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-5">
                            <h5 className="text-dark">Area of Interest : </h5>
                        </div>

                        <div className="col-12 mt-3">
                            <div className="custom-form p-2  pt-4 border rounded">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <Autocomplete
                                            className='bg-light rounded'
                                            // value={values.fields}
                                            size="small"
                                            multiple
                                            limitTags={2}
                                            id="fields"
                                            defaultValue={interest}
                                            options={category}
                                            disableCloseOnSelect
                                            onChange={(e, n) => {
                                                setinterest(n)
                                                // console.log(n)
                                            }}
                                            name="fields"
                                            getOptionLabel={(option) => option}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    {/* {props} */}
                                                    <Checkbox
                                                        key={props.id}
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />

                                                    {option}
                                                </li>
                                            )}
                                            style={{ width: "auto" }}
                                            renderInput={(params) => (
                                                <TextField value={interest}  {...params} label="Category" placeholder="Category" />
                                            )}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-12 mt-4 ">
                            <button type="submit" id="submit" name="send" className=" btn btn-primary" value="Submit ">
                                Submit
                            </button>
                        </div>
                    </div>


                </div>
            </section>
        </form>

    )
}

export default AuthHoc(Edit_profile)


