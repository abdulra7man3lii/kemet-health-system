require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./src/routes/healthRoutes');

const app = express();

// Middleware
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
app.listen(PORT, () => {
    console.log(`Health System Service listening on port ${PORT}`);
});
