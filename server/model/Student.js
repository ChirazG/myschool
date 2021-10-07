const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    gender: {  //male, female
            type:String,
            required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    lastyear: { //succeede, failed
            type:String,
            required: true
    },
    livewith: { //mother, father, both, other
            type:String,
            required: true    
    },    
    phone: {      
        type: Number,
        required: true
    },
    adresse: {       
            type: String,
            required: true
        },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   // selectedFile: String,

    refreshJWT: {
        token:{
            type: String,
            maxlength: 500,
            default: ''
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
});

module.exports = mongoose.model("Student", StudentSchema);