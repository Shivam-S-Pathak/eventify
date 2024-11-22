// models/Event.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enrollment_Schema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
        
    },
    Ticket_No: {
        type: Number,
        
    },
    ReciptImage: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'students',            
        required: true
      }
    
});
const Enrollment= mongoose.model('Enrollment', Enrollment_Schema);

module.exports = Enrollment;

