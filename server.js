const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route files
const hotels = require('./routes/hotels');

// Load env variabls
dotenv.config({path: './config/config.env'});

const app = express();

// logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/hotels', hotels);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});     