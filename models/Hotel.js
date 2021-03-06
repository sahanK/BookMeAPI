const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 500 characters'],
        trim: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: [Number],
        required: [true, 'Please add phone number']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    city: {
        type: String,
        required: [true, 'Please add the city']
    },
    province: {
        type: String,
        required: [true, 'Please add the province']
    },
    zipcode: {
        type: String,
        required: [true, 'Please add the zipcode']
    },
    location: {
        type: {
            type: String,
            required: true,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating cannot be more than 10']
    },
    ceatedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true}
});

// Create a slug before save
HotelSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Reverse populate with virtuals
HotelSchema.virtual('rooms', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

// Cascade delete rooms when a hotel is deleted
HotelSchema.pre('remove', async function (next) {
    await this.model('Room').deleteMany({ hotel: this._id });
    next();
});
// Geocode & create location
/*
HotelSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.zipcode);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
    };
    next();
})
*/

module.exports = mongoose.model('Hotel', HotelSchema);