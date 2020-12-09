const express = require('express');
const router = express.Router();
const {
    getGuests,
    getGuest,
    createGuest,
    updateGuest,
    deleteGuest
} = require('../controllers/guests');

// Include other resource routers
const bookingsRouter = require('./bookings');

// Re-route into other resource routers
router.use('/:guestId/bookings', bookingsRouter);

router
    .route('/')
    .get(getGuests)
    .post(createGuest);

router
    .route('/:id')
    .get(getGuest)
    .put(updateGuest)
    .delete(deleteGuest);

module.exports = router;