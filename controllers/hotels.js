const Hotel = require('../models/Hotel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getHotels = asyncHandler(async (req, res, next) => {
    const hotels = await Hotel.find();
    res.status(200).json({
        success: true,
        count: hotels.length,
        data: hotels
    });
});

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getHotel = asyncHandler(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
        return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: hotel
    });
});

// @desc    Create a hotel
// @route   POST /api/v1/hotels
// @access  Private
exports.createHotel = asyncHandler(async (req, res, next) => {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
        success: true,
        msg: `Hotel created`,
        data: hotel
    });
});

// @desc    Update a hotel
// @route   PUT /api/v1/hotels/:id
// @access  Private
exports.updateHotel = asyncHandler(async (req, res, next) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!hotel) {
        return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: hotel });
});

// @desc    Delete a hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private
exports.deleteHotel = asyncHandler(async (req, res, next) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
        return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        msg: `Hotel deleted with id ${req.params.id}`
    });
});

// @desc    Get hotels in a radius
// @route   GET /api/v1/hotels/radius/:latitude/:longitude/:distance
// @access  Public
exports.getHotelsInRadius = asyncHandler(async (req, res, next) => {
    const { latitude, longitude, distance } = req.params;

    // get lat, long from geocoder
    //const location = await geocoder.geocode(zipcode);
    //const lat = location[0].latitude;
    //const long = location[0].longitude;

    // calculate radius using radians
    // divide distance by radius of earth
    // earth radius 6378 km
    const radius = distance / 6378;

    const hotels = await Hotel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radius]
            }
        }
    });

    res.status(200).json({
        success: true,
        count: hotels.length,
        data: hotels
    });
});