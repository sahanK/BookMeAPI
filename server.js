const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db')

// Load env variabls
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const hotels = require('./routes/hotels');



const app = express();

// Body parser
app.use(express.json());

// logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/hotels', hotels);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.blue.bold);
});   

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and exist process
    server.close(() => process.exit(1));
})