// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getHotels = (req, res, next) => {
    res.status(200).json({success: true, message: 'show all hotels'});
}

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getHotel = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show hotel ${req.params.id}`});
}

// @desc    Create a hotel
// @route   POST /api/v1/hotels
// @access  Private
exports.createHotel = (req, res, next) => {
    res.status(201).json({success: true, msg: `Hotel created`});
}

// @desc    Update a hotel
// @route   PUT /api/v1/hotels/:id
// @access  Private
exports.updateHotel = (req, res, next) => {
    res.status(200).json({success: true, msg: `Hotel updated with id ${req.params.id}`});
}

// @desc    Delete a hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private
exports.deleteHotel = (req, res, next) => {
    res.status(200).json({success: true, msg: `Hotel deleted with id ${req.params.id}`});
}