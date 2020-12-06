const express = require('express');
const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/rooms');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(getRooms)
    .post(createRoom);

router.route('/:id')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom);

module.exports = router;