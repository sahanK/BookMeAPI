const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

// Load env variabls
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const hotels = require('./routes/hotels');
const guests = require('./routes/guests');
const rooms = require('./routes/rooms');
const bookings = require('./routes/bookings');
const auth = require('./routes/auth');


const app = express();

// CORS
app.use(cors())

// Body parser
app.use(express.json());

// logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// File uploading middleware
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/hotels', hotels);
app.use('/api/v1/guests', guests);
app.use('/api/v1/rooms', rooms);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/auth', auth);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.blue.bold);
});   

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and exist process
    server.close(() => process.exit(1));
})