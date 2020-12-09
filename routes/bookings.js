const express = require('express');
const {
    getBooking,
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookings');
 
const router = express.Router({mergeParams: true});

router.route('/')
    .get(getBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .put(updateBooking)
    .delete(deleteBooking);

module.exports = router;