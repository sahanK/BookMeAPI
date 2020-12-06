const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add the first name'],
        trim: true
    },	
    lastName: {
        type: String,
        required: [true, 'Please add the last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
        trim: true
    },		
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        trim: true
    },	
    createdAt: {
        type: Date,
        default: Date.now
    },	
    updatedAt: {
        type: Date,
        default: Date.now
    }	
});

module.exports = mongoose.model('Guest', GuestSchema);