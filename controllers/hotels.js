const Hotel = require('../models/Hotel');

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
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(400).json({ success: false, msg: "Not found" });
        }
        res.status(200).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        res.status(400).json({ success: false, error });
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
    } catch (error) {
        res.status(500).json({ success: false, error });
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
            return res.status(400).json({ success: false, msg: "Not found" });
        }
        res.status(200).json({ success: true, data: hotel });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}

// @desc    Delete a hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private
exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(400).json({ success: false, mag: "Not found" });
        }
        res.status(200).json({
            success: true,
            msg: `Hotel deleted with id ${req.params.id}`
        });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}