const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/jwtAuth');

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
