const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Guest = require('../models/Guest');
const errorHandler = require('../middleware/error');

// @desc    Guest Login
// @route   GET /api/v1/auth/login
// @access  Private

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse(`Please enter the email and password`, 400));
    }

    // Check for guest
    const guest = await Guest.findOne({ email }).select('+password');

    if (!guest) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    const isMatched = await guest.matchPassword(password);

    if (!isMatched) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    res.status(200).json({
        success: true,
        guest: {
            id: guest._id,
            email: guest.email
        }
    });
});
