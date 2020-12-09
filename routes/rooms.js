const express = require('express');
const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/rooms');

const router = express.Router({ mergeParams: true });

// Include other resource routers
const bookingsRouter = require('./bookings');

// Re-route into other resource routers
router.use('/:roomId/bookings', bookingsRouter);

router.route('/')
    .get(getRooms)
    .post(createRoom);

router.route('/:id')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom);

module.exports = router;