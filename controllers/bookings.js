const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Guest = require('../models/Guest');
const Room = require('../models/Room');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a booking
// @route   POST /api/v1/hotels/:hotelId/rooms/:roomId/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res, next) => {
    const room = await Room.findOne({
        _id: req.params.roomId,
        hotel: req.params.hotelId
    });
    if (!room) {
        return next(new ErrorResponse('No room found', 404));
    }
    const guest = await Guest.findById(req.body.guest);
    if (!guest) {
        return next(new ErrorResponse(`No guest with id ${req.body.guest}`, 404));
    }
    req.body.hotel = req.params.hotelId;
    req.body.room = req.params.roomId;
    const booking = await Booking.create(req.body);
    res.status(201).json({
        success: true,
        data: booking
    }); 
});

// @desc    Get all bookings 
// @route   GET /api/v1/hotels/:hotelId/bookings
// @route   GET /api/v1/hotels/:hotelId/rooms/:roomId/bookings
// @route   GET /api/v1/guests/:guestId/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.hotelId) {
        query = Booking.find({ hotel: req.params.hotelId });

        if (req.params.roomId) {
            query = Booking.find({
                hotel: req.params.hotelId,
                room: req.params.roomId
            });
        }
    }
    if (req.params.guestId) {
        query = Booking.find({ guest: req.params.guestId });
    }
    // Populate fields
    query = query.populate([
        { path: 'hotel', select: 'name' },
        { path: 'room', select: 'roomNo' },
        { path: 'guest', select: 'firstName lastName' }
    ]);
    const bookings = await query;
    res.status(200).json({
        success: true,
        data: bookings
    });
});

// @desc    Get a single booking
// @route   GET /api/v1/bookings/:Id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate([
        { path: 'hotel', select: 'name' },
        { path: 'room', select: 'roomNo' },
        { path: 'guest', select: 'firstName lastName' }
    ]);
    if (!booking) {
        return next(new ErrorResponse(`No booking with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Update a booking
// @route   PUT /api/v1/bookings/:bookingId
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!booking) {
        return next(new ErrorResponse(`No booking with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Delete a booking
// @route   DELETE /api/v1/bookings/:bookingId
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return next(new ErrorResponse(`No booking with id ${req.params.id}`, 404));
    }
    await booking.remove();
    res.status(200).json({
        success: true,
        message: `Booking deleted with id ${req.params.id}`
    });
});