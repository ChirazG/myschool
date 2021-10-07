const mongoose = require('mongoose')
const { Schema } = mongoose


const MarkSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    mark: {
        type: Number,
        default: -1
    },
    
})


module.exports = mongoose.model('Mark', MarkSchema)