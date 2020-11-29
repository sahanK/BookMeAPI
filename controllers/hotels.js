const Hotel = require('../models/Hotel');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    } catch (err) {
        next(err);
    }
}

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: hotel
        });
    } catch (err) {
        next(err);
    }
    
}

// @desc    Create a hotel
// @route   POST /api/v1/hotels
// @access  Private
exports.createHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json({
            success: true,
            msg: `Hotel created`,
            data: hotel
        });
    } catch (err) {
        next(err);
    }

}

// @desc    Update a hotel
// @route   PUT /api/v1/hotels/:id
// @access  Private
exports.updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!hotel) {
            return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: hotel });
    } catch (err) {
        next(err);
    }
}

// @desc    Delete a hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private
exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            msg: `Hotel deleted with id ${req.params.id}`
        });
    } catch (err) {
        next(err);
    }
}