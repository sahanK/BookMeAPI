const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({	
    roomNo: {
        type: String,
        required: [true, 'Please add the room number'],
        trim: true
    },	
    localPrice: {
        type: Number,
        required: [true, 'Please add the local price']
    },	
    internationalPrice: {
        type: Number,
        required: [true, 'Please add the international price']
    },	
    localAdvance: {
        type: Number,
        required: [true, 'Please add the local advance']
    },	
    internationalAdvance: {
        type: Number,
        required: [true, 'Please add the international advance']
    },	
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },	
    updatedAt: {
        type: Date,
        default: Date.now
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

module.exports = mongoose.model('Room', RoomSchema);