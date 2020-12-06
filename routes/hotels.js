const express = require('express');
const router = express.Router();
const { 
    getHotels, 
    getHotel, 
    createHotel, 
    updateHotel, 
    deleteHotel,
    getHotelsInRadius
} = require('../controllers/hotels');

// Include other resource routers
const roomsRouter = require('./rooms');

// Re-route into other resource routers
router.use('/:hotelId/rooms', roomsRouter);

router
    .route('/radius/:latitude/:longitude/:distance')
    .get(getHotelsInRadius);

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