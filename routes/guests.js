const express = require('express');
const router = express.Router();
const {
    getGuests,
    getGuest,
    createGuest,
    updateGuest,
    deleteGuest
} = require('../controllers/guests');

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