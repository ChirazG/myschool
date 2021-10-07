const mongoose = require('mongoose')
const { Schema } = mongoose


const PresenceSchema = new Schema({
    attendancy : {
        type: String,
        enum:["P","A",""]
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    addedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    

},{ timestamps: { createdAt: 'created_at', updatedAt:'updated_at' }} )


module.exports = mongoose.model('Presence', PresenceSchema)