const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    CIN: {
        type: Number,
        required: true
    },
    subject: String,
    phone: {
        type: Number,
        required: true
    },
    adresse: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    //selectedFile: String,
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

module.exports = mongoose.model("Teacher", TeacherSchema);