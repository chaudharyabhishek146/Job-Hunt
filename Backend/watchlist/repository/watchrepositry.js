const Watchmodel = require('../modals/watchmodel');
const { v4: uuidv4 } = require('uuid');
const GetWatchs = () => {
    return new Promise((resolve, reject) => {

        Watchmodel.find({}, (err, user) => {
            if (!err) {
                resolve(user);
            }
            else {
                reject(err);
            }
        });

    });


}
const GetWatch = (id) => {
    return new Promise((resolve, reject) => {

        Watchmodel.find({ email: id }, (err, user) => {
            if (!err) {
                if (user === null)
                    resolve({ status: 404, msg: "No details for this user" });
                else
                    resolve(user);
            }
            else {
                console.log("er")
                reject(err)
            }
        });

    });


}
const AddWatch = (data, mail) => {
    return new Promise((resolve, reject) => {


        // let a=data.education;
        // for(let i=0;i<a.length ;i++){
        //   a[i]={id:uuidv4(),...a[i]}   
        //}
        //console.log(a);
        Watchmodel.find({ _id: data.id }, (err, user) => {
            if (!err) {
                if (user !== null)
                    resolve({ status: 404, msg: "Already Added to WatchList" });
            }
            else {
                console.log("er")
                reject(err)
            }
        })
        let newWatch = new Watchmodel({
            _id: data.id,
            email: mail,
            data: data


        })
        newWatch.save((err) => {
            if (!err) {
                resolve({ status: 200, msg: 'Added to WatchList' })
            }
            else {
                reject({ status: 400, msg: err });
            }

        })

    });


}

function DeleteWatch(id) {
    return new Promise((resolve, reject) => {
        Watchmodel.deleteOne({ _id: id }, (err, data) => {
            if (!err) {
                resolve({ status: 200, msg: "Removed from watchlist" });
            }
            else {
                reject({ status: 40, msg: err });
            }
        });
    });
}

module.exports = { GetWatchs, GetWatch, AddWatch, DeleteWatch }