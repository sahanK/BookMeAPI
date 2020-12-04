const Guest = require('../models/Guest');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all guests
// @route   GET /api/v1/guests
// @access  Private
exports.getGuests = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'All guests'
    });
});

// @desc    Get single guest
// @route   GET /api/v1/guests/:id
// @access  Private
exports.getGuest = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: `Guest with id ${req.params.id}`
    });
});

// @desc    Create a guest
// @route   POST /api/v1/guests
// @access  Private
exports.createGuest = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Guest created'
    });
});

// @desc    Update a guest
// @route   PUT /api/v1/guests/:id
// @access  Private
exports.updateGuest = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Guest updated ${req.params.id}`
    });
});

// @desc    Delete a guest
// @route   DELETE /api/v1/guests/:id
// @access  Private
exports.deleteGuest = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Guest deleted ${req.params.id}`
    });
});