const Booking = require('../models/Booking');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a booking
// @route   POST /api/v1/hotels/:hotelId/rooms/:roomId/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res, next) => {
    res.status(201).json({
        success: true,
        message: 'Booking created'
    }); 
});

// @desc    Get all bookings 
// @route   GET /api/v1/hotels/:hotelId/bookings
// @route   GET /api/v1/hotels/:hotelId/rooms/:roomId/bookings
// @route   GET /api/v1/guests/:guestId/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'All bookings'
    });
});

// @desc    Get a single booking
// @route   GET /api/v1/bookings/:bookingId
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'data'
    });
});

// @desc    Update a booking
// @route   PUT /api/v1/bookings/:bookingId
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Booking details update with id ${req.params.id}`
    });
});

// @desc    Delete a booking
// @route   DELETE /api/v1/bookings/:bookingId
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Booking deleted with id ${req.params.id}`
    });
});