const Guest = require('../models/Guest');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all guests
// @route   GET /api/v1/guests
// @access  Private
exports.getGuests = asyncHandler(async (req, res, next) => {
    const guests = await Guest.find(req.query);
    res.status(200).json({
        success: true,
        count: guests.length,
        data: guests
    });
});

// @desc    Get single guest
// @route   GET /api/v1/guests/:id
// @access  Private
exports.getGuest = asyncHandler(async (req, res, next) => {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
        return next(new ErrorResponse(`No guest found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: guest
    });
});

// @desc    Create a guest
// @route   POST /api/v1/guests
// @access  Private
exports.createGuest = asyncHandler(async (req, res, next) => {
    const guest = await Guest.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Guest created',
        data: guest
    });
});

// @desc    Update a guest
// @route   PUT /api/v1/guests/:id
// @access  Private
exports.updateGuest = asyncHandler(async (req, res, next) => {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!guest) {
        return next(new ErrorResponse(`No guest found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: guest
    });
});

// @desc    Delete a guest
// @route   DELETE /api/v1/guests/:id
// @access  Private
exports.deleteGuest = asyncHandler(async (req, res, next) => {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
        return next(new ErrorResponse(`No guest found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: `Guest deleted with id ${req.params.id}`
    });
});