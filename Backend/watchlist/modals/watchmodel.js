const mongoose = require('mongoose')
const WatchSchema = mongoose.Schema({
    _id:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    }
    // name:{
    //     type:String,  
    //     required:true
    // },
    // short_name:{
    //     type:String,  
    //     required:true
    // },

    // description:{type:String,required:true},
    // location:[
    //     {name:{type:String,required:true}
    //     }
    // ],
    // industries:[
    //     {name:{type:String,required:true}
    //     }
    // ],
    // size:{
    //     name:{type:String,required:true},
    //     short_name:{type:String,required:true}

    // },
    // refs:{
    //     landing_page:{type:String,required:true},
    //     jobs_page: {type:String,required:true},
    //     mini_f1_image: {type:String,required:true},
    //     f2_image: {type:String,required:true},
    //     logo_image: {type:String,required:true},
    //     f1_image: {type:String,required:true},
    //     f3_image:{type:String,required:true},
    // }

   
    
    


});

module.exports = mongoose.model('Watchmodel', WatchSchema,'Watch');