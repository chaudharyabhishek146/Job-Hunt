const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    _id:{
        type: String,
    },
    email:{
        type:String,
        required:true
    },
    basic:{
        type:Array,
        required:true

    },
    contact:{
        type:Array,
        required:true

    },
    education:{
        type:Array,
        required:true

    },
    works:{
        type:Array,
        required:true

    },
    skills:{
        type:String,
        required:true

    },
    fields:{
        type:Array,
        required:true

    }


    // name:{
    //     type:String,  
    // },
    // dob:{type:String},
    // phoneno:{type:Number,required:true},
    // address:{type:String,required:true},
        
    //     education: [
    //       { //id:{type:String,
    //       // },
            
    //         school:{
    //             type:String,
    //             required:true
    //         },

    //         qualification:{type:String,
    //             required:true
    //         },
    //         percentage:{type:String,
    //         required:true
    //         },
    //     },
        
    // ],
    // skills:[
    //     {   
    //         id:{type:String},
    //         skillname:{
    //             type:String,
    //         }
    //     }
        
    // ]

    // ,
    // fields:[
    //     {   
    //         id:{type:String,required:true},
    //         fields:{
    //             type:String,
    //             required:true
                
    //         }
    //     }
    // ],
    // projects:[
    //     {
    //         id:{type:String,required:true},
    //         projectname:{
    //             type:String
    //         },
    //         description:{
    //             type:String
    //         },
    //         skillused:{
    //             type:String,requied:true
    //         }
    //     },
    // ],
    // jobs:[
    //     {
    //         id:{type:String,required:true},
    //         company:{type:String,required:true},
    //         position:{type:String,required:true},
    //         duration:{type:String,required:true}
    //     }
    // ]

    
    


});

module.exports = mongoose.model('Usermodel', UserSchema,'User');