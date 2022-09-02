import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import apiConfig from '../config';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import LoadingButton from '@mui/lab/LoadingButton';

import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
// import { set } from 'mongoose';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Search(props) {

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
        "IT",
        "Law",
        "Legal Services",
        "Management",
        "Manufacturing and Warehouse",
        "Marketing",
        "Mechanic",
        "Media, PR, and Communinameions",
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
    // console.log(category)
    const [value, setValue] = React.useState(null);
    // const [comps, setcomps] = React.useState([]);//store selected catgegory
    const [comp, setcomp] = React.useState([]);
    // const [loading, setloading] = React.useState(["loading..."]);
    // const [fcat, setfcat] = React.useState([]);//store selected companies
    const [res, setres] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    function handleClick() {
        setLoading(true);
    }

    React.useEffect(() => {
        fetch(`${apiConfig.extApi}/getcompanies`).then(data => data.json()).then(data => {
            //  console.log(data);
              setcomp(data.countries) })
    }, [])
    // React.useState()
    // console.log("comp", comp)
    return (
        // <div className="home-form-position">

        //         <div className="row">
        //             <div className="col-lg-12 container d-flex justify-content-center " id="cont">
        //                 <div className="home-registration-form container-fluid p-4 mb-3 col-md-6 col-sm-8 col-9 col-lg-12">
        //                     <form className="registration-form">
        <div className="row col-md-8 col-lg-9 col-4">


            {/* Search */}
            <div className="col-lg-6 col-md-12  d-flex justify-content-center me-2">
                <div className="registration-form-box">
                    <i className="fa fa-briefcase" style={{ color: "white" }}></i>
                    {/* <input type="text" id="exampleInputName1" className="form-control rounded registration-input-box" placeholder="Job keybords..." /> */}
                    {/* country */}
                    {
                        comp.length !== 0 ?
                            <Autocomplete
                                className='bg-light rounded'
                                value={props.comps}
                                size="small"
                                multiple
                                limitTags={2}
                                id="checkboxes-tags-demo"
                                options={comp}
                                disableCloseOnSelect
                                onChange={(e, n) => { props.setcomps(n) }}
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
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Company" placeholder="Company" />
                                )}
                            />
                            : <div className='mt-1'><LoadingButton
                            className='bg-light me-1 px-5 '
                            style={{width:"300px"}}
                                onClick={handleClick}
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Loading
                            </LoadingButton></div>
                    }


                </div>
            </div>

            {/* category */}

            <div className="col-lg-5 col-md-12 d-flex justify-content-center me-2">
                <div className="registration-form-box">
                    <i className="fa fa-list-alt" style={{ color: "white" }}></i>
                    <div className="selectize-control demo-default single">
                        <div className="selectize-input items not-full has-options">
                            <Autocomplete
                                className='bg-light rounded'
                                value={props.fcat}
                                size="small"

                                multiple
                                limitTags={2}
                                id="checkboxes-tags-demo"
                                options={category}
                                disableCloseOnSelect
                                onChange={(e, n) => { props.setfcat(n) }}
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
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Category" placeholder="Category" />
                                )}
                            />

                        </div>

                    </div>
                </div>
            </div>



            {/* END OF CATEGORY */}
            {/* <div className="container d-flex justify-content-center col-lg-3 col-md-6 mt-4 ">
                <div className="registration-form-box">
                    <input onClick={(e) => { props.setcomps([]); props.setfcat([]) }} name="send" className=" btn btn-secondary btn-block" value="Reset" />
                </div>
            </div> */}


        </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        // </div>
    )
}




