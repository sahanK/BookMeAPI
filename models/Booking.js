const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    checkIn: {
        type: Date,
        required: [true, 'Please add the check in date']
    },
    checkOut: {
        type: Date,
        required: [true, 'Please add the check out date']
    },
    status: {
        type: String,
        enum: ['on_site', 'departed'],
        default: 'on_site'
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },	
    room: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    guest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Guest',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Booking', BookingSchema);