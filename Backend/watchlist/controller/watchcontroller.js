const repo = require('../repository/watchrepositry');

const GetWatchs = (req,res)=>{
    repo.GetWatchs().then(data=>{
        res.status(200).send(data);
    });
    
}
const GetWatch = (req,res)=>{
    console.log(req.params.id)
    repo.GetWatch(req.params.id).then(data=>{
        res.status(200).send(data);
    });
    
}
const AddWatch = (req,res)=>{
    console.log("yes")
    repo.AddWatch(req.body,req.params.email).then(data=>{
        res.status(200).send(data);
    });
    
}

function DeleteWatch(req,res){
    repo.DeleteWatch(req.params.id).then(data=>{
        res.status(200).send(data)
    })
}
module.exports={GetWatchs,GetWatch ,AddWatch, DeleteWatch }