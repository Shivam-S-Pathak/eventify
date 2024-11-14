// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    }
});
const events= mongoose.model('Events', eventSchema);

module.exports = events;

