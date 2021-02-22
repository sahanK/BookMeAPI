const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    password: {
        type: String,
        required: [true, 'Please add the password'],
        minlength: 5,
        select: false
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

// Encrypt password using bcrypt
GuestSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match entered password to hashed password in database
GuestSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('Guest', GuestSchema);