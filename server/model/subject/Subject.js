const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = mongoose.Schema({
    title: String, 
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    addedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Subject", SubjectSchema);