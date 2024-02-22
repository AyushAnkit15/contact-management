const mongoose = require('mongoose') ;

const ContactSchema = mongoose.Schema({
    name:{
        type : String ,
        required :true 
    } , 
    age : {
        type : Number , 
        required : true
    },
    phone :{
        type : Number , 
        required: true ,  
        unique:true ,

    }

    
});


const Contacts = mongoose.model('Contact' , ContactSchema);

module.exports = Contacts ; 




