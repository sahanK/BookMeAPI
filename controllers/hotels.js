const Hotel = require('../models/Hotel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const path = require('path');

// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getHotels = asyncHandler(async (req, res, next) => {

    // copy req.query
    const reqQuery = { ...req.query };

    // fields to exclude
    const removeFields = ['select', 'sort'];

    // remove fields
    removeFields.forEach(param => delete reqQuery[param]);

    // make the initial query
    let query = Hotel.find(reqQuery).populate('rooms');

    // SELECT FIELDS
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        // modify the query to select fields
        query = query.select(fields);
    }

    // SORT BY FIELDS
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        //modify the query to sortBy fields
        query = query.sort(sortBy);
    }
    
    const hotels = await query;

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
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
        return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
    }
    hotel.remove();
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

// @desc    Upload photo
// @route   POST /api/v1/hotels/:id/photos
// @access  Public
exports.photoUpload = asyncHandler(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id); 
    if (!hotel) {
        return next(new ErrorResponse(`Hotel not found with the id ${req.params.id}`, 404));
    }
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a photo`, 400));
    }

    let files = [];
    let fileNames = [];

    if (req.files.file.length > 1) {
        files = req.files.file;
    }
    else {
        files.push(req.files.file);
    }

    files.forEach(function (file, index) {
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse('Please upload an image file', 400));
        }
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload an image size less than ${process.env.MAX_FILE_UPLOAD}`, 400));
        }

        file.name = `${hotel._id}_photo_${index}${path.parse(file.name).ext}`;

        fileNames.push(file.name);

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                return next(new ErrorResponse(`Problem with photo upload`, 500));
            }
        });
    });

    await Hotel.findByIdAndUpdate(req.params.id, {
        photos: fileNames
    });

    res.status(200).json({
        success: true,
        data: fileNames
    });
});
