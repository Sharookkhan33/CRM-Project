const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./middleware/logger'); // Import custom logger
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(morgan('dev')); // Log HTTP requests
app.use(logger); // Use custom logger

// Routes
app.use('/', customerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

