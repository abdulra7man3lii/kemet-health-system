require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const healthRoutes = require('./src/routes/healthRoutes');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

// Middleware
app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);

// Base route checks Health API is alive
app.get('/', (req, res) => {
    res.json({ status: 'Health System API is Online' });
});

const PORT = process.env.HEALTH_SYSTEM_PORT || 4003;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Health System Service listening on 127.0.0.1:${PORT}`);
});
