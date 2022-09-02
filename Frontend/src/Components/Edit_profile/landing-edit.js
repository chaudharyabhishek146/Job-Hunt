import React from 'react'

export default function Landing_edit() {
  return (
    <div>
        <section className="bg-half page-next-level">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center text-white">
                            <h4 className="text-uppercase title mb-4">Create Resume</h4>
                            <ul className="page-next d-inline-block mb-0 list-unstyled" >
                                <a href="#" className="text-uppercase text-white font-weight-bold">Home   </a>
                                <a href="#" className="text-uppercase text-white font-weight-bold">{`   >   `}Profile</a>
                                <li >
                                    <span className="text-uppercase text-white font-weight-bold">Edit Profile</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
