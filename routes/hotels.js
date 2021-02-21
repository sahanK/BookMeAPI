const express = require('express');
const router = express.Router();
const { 
    getHotels, 
    getHotel, 
    createHotel, 
    updateHotel, 
    deleteHotel,
    getHotelsInRadius,
    photoUpload
} = require('../controllers/hotels');

// Include other resource routers
const roomsRouter = require('./rooms');
const bookingsRouter = require('./bookings');

// Re-route into other resource routers
router.use('/:hotelId/rooms', roomsRouter);
router.use('/:hotelId/bookings', bookingsRouter);

router
    .route('/radius/:latitude/:longitude/:distance')
    .get(getHotelsInRadius);

router
    .route('/:id/photo')
    .put(photoUpload);

router
    .route('/')
    .get(getHotels)
    .post(createHotel);

router
    .route('/:id')
    .get(getHotel)
    .put(updateHotel)
    .delete(deleteHotel);

module.exports = router;