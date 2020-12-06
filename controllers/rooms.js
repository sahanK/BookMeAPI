
const Room = require('../models/Room');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all rooms
// @route   GET /api/v1/rooms
// @route   GET /api/v1/hotels/:hotelId/rooms
// @access  Public
exports.getRooms = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'All rooms'
    });
});

// @desc    Get single room
// @route   GET /api/v1/rooms/:id
// @access  Public
exports.getRoom = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Room with id ${req.params.id}`
    });
});

// @desc    Create room
// @route   POST /api/v1/rooms
// @access  Private
exports.createRoom = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        success: true,
        data: req.body
    });
});

// @desc    Update room
// @route   PUT /api/v1/rooms/:id
// @access  Private
exports.updateRoom = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Room updated with id ${req.params.id}`
    });
});

// @desc    Get all rooms
// @route   GET /api/v1/rooms
// @access  Public
exports.deleteRoom = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Room deleted with the id ${req.params.id}`
    });
});