import React from 'react'

export default function Sort(props) {
    const [asc, setasc] = React.useState(true)
    const [lvl, setlvl] = React.useState(true)
    // const [level, setlevel] = React.useState("none")
    // const [order, setorder] = React.useState("none")
    return (
        <div>
            <div className='mb-4 d-flex-justify-content-center align-items-center'>
                <div className="mb-2 text-dark  rounded mb-4" style={{border:"1px solid gray"}}><h4 className='offset-1 mt-1'>Filter </h4></div>
                <p>
                    {
                        asc ? <button onClick={(e) => setasc(false)} className="btn d-flex w-100 justify-content-between" style={{ border: "1px solid black" }} data-bs-toggle="collapse" data-bs-target="#sort" aria-expanded="false" aria-controls="sort">

                            <div>Descending</div> <div><i className="fa-solid fa-plus"></i></div>

                        </button> : <button onClick={(e) => setasc(true)} className="btn d-flex w-100 justify-content-between" style={{ border: "1px solid black" }} data-bs-toggle="collapse" data-bs-target="#sort" aria-expanded="false" aria-controls="sort">

                            <div>Ascending order</div> <div><i className="fa-solid fa-minus"></i></div>

                        </button>
                    }

                </p>
                <div className="collapse " id="sort">
                    <div className="card card-body">
                        {/* <div className="form-check">
                            <input className="form-check-input" type="radio" name="sorting" id="none1" />
                            <label className="form-check-label" value="none" onChange={(e) => { props.setorder(e.target.value) }} for="none1">
                                None
                            </label>
                        </div> */}
                        <div className="form-check">
                            <input className="form-check-input" value={true} onChange={(e) => { props.setorder(e.target.value) }} type="radio" name="sorting" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value={false} onChange={(e) => { props.setorder(e.target.value) }} type="radio" name="sorting" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                False
                            </label>
                        </div>
                    </div>
                </div></div>
            <div className='mb-4'>
                <p>
                    {
                        lvl ? <button onClick={(e) => setlvl(false)} className="btn d-flex w-100 justify-content-between" style={{ border: "1px solid black" }} data-bs-toggle="collapse" data-bs-target="#level" aria-expanded="false" aria-controls="level">

                            <div>Level</div> <div><i className="fa-solid fa-plus"></i></div>

                        </button> : <button onClick={(e) => setlvl(true)} className="btn d-flex w-100 justify-content-between" style={{ border: "1px solid black" }} data-bs-toggle="collapse" data-bs-target="#level" aria-expanded="false" aria-controls="level">

                            <div>Level</div> <div><i className="fa-solid fa-minus"></i></div>

                        </button>
                    }
                </p>
                <div className="collapse" id="level">
                    <div className="card card-body">

                        <div className="form-check">
                            <input className="form-check-input" value="none" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="none2" />
                            <label className="form-check-label" for="none2">
                                None
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Entry Level" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="entry" />
                            <label className="form-check-label" for="entry">
                                Entry Level
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Mid Level" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="mid" />
                            <label className="form-check-label" for="mid">
                                Mid Level
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Senior Level" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="senior" />
                            <label className="form-check-label" for="senior">
                                Senior Level
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="management" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="management" />
                            <label className="form-check-label" for="management">
                                management
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value="Internship" onChange={(e) => { props.setlevel(e.target.value); }} type="radio" name="flexRadioDefault" id="intern" />
                            <label className="form-check-label" for="intern">
                                Internship
                            </label>
                        </div>
                    </div>
               
                </div>
            </div>
        </div>
    )
}
