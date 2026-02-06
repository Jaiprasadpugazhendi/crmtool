const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error.middleware');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow frontend domain
    credentials: true
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 10 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// Mount Routes
app.use('/api/v1', routes);

// Check if API works
app.get('/', (req, res) => {
    res.send('SalesAI CRM API is running...');
});

// Error Handler
app.use(errorHandler);

module.exports = app;
