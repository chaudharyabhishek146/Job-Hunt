const Usermodel = require('../models/profilemodal');
const { v4: uuidv4 } = require('uuid');
const GetProfiles = () => {
    return new Promise((resolve, reject) => {

        Usermodel.find({}, (err, user) => {
            if (!err) {
                resolve({ user });
            }
            else {
                reject(err);
            }
        });

    });


}
const GetProfile = (mail) => {
    return new Promise((resolve, reject) => {

        Usermodel.findOne({ email: mail }, (err, user) => {
            if (!err) {
                if (user === null) {
                    resolve({ status: 400, message: "User profile not found", err });
                }

                // console.log("User not found")
                resolve({ status: 200, message: "User Profile Found", user: user });
            }

            else {
                reject({ status: 400, message: "User profile not found", err });
            }
        });

    });


}

const AddProfile = (data, mail) => {
    return new Promise((resolve, reject) => {

        Usermodel.findOne({ email: mail }, (err, user) => {
            if (!err) {
                if (user === null) {
                    let newprofile = new Usermodel({
                        _id:uuidv4(),
                        email: mail,
                        basic: data.basic,
                        contact: data.contact,
                        education: data.education,
                        works: data.works,
                        skills: data.skills,
                        fields: data.fields
                        // currentrole: data.currentrole

                    });
                    newprofile.save((err) => {
                        if (!err) {
                            resolve({ status: 200, message: "User Profile saved" });

                        }
                        else {
                            reject(err)
                            // resolve({ status: 400, message: "error adding profile",err:err});
                        }
                    });
                    // resolve({ status: 400, message: "User profile not found", err });
                }
                else {
                    // let newprofile = new Usermodel({
                    //     email: mail,
                    //     basic: data.basic,
                    //     contact: data.contact,
                    //     education: data.education,
                    //     works: data.works,
                    //     skills: data.skills,
                    //     field: data.fields
                    //     // currentrole: data.currentrole
                    // });
                    // console.log(data.fields)
                    Usermodel.findOneAndUpdate({ email: mail }, 
                        {
                            email: mail,
                            basic: data.basic,
                            contact: data.contact,
                            education: data.education,
                            works: data.works,
                            skills: data.skills,
                            fields: data.fields
                        }
                        
                        // newprofile
                        
                        , (err, data) => {
                        if (!err) {
                            resolve({ status: 200, message: "User Profile Updated", user: user });
                        }
                        else {
                            reject({ status: 400, message: "error updating profile", err: err });
                        }
                    });
                }

                // console.log("User not found")
            }

            else {
                reject({ status: 400, err: err })
                // reject({ status: 400, message: "User profile not found", err });
            }
        }
        );
    }
    )
}

const UpdateProfile = (id, data) => {
    return new Promise((resolve, reject) => {
        console.log(data.profile)
        let newprofile = new Usermodel({
            email: data.email,
            basic: data.basic,
            contact: data.contact,
            education: data.education,
            works: data.works,
            skills: data.skills,
            field: data.fields,
            currentrole: data.currentrole

        });
        Usermodel.findOneAndUpdate({ _id: id }, newprofile, (err, data) => {
            if (!err) {
                resolve(data);
            }
            else {
                reject(err);
            }
        });

    }

    );
}


module.exports = { GetProfiles, AddProfile, GetProfile, UpdateProfile }